import React, { useEffect, useState } from 'react';
import './styles.scss'
import DialogSlide from "components/DialogSlide";
import { useTranslation } from "react-i18next";
import ResultInputForm from 'features/Course/components/ResultInputForm'
import { RESULT_TYPE_FILE, RESULT_TYPE_IMAGE, RESULT_TYPE_INPUT } from 'features/Course/constant/resultType';
import { uploadToServer } from 'core/helper/uploadToServer'
import DropzoneUpload from 'components/DropzoneUpload'
import { useSnackbar } from 'notistack';
function InputResultPopup(props) {
    const { isOpen, handleClose, type, index, onChange, amount, multiple } = props
    const [data, setData] = useState([])
    const [origin, setOriginData] = useState([])
    const [popupTitle, setPopupTitle] = useState('')
    const [disabledConfirm, setDisabledConfirm] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation()

    const dropzoneConfig = {
        filesLimit: 1,
        showPreviews: true,
        showPreviewsInDropzone: false,
        showFileNamesInPreview: true,
        previewText: "",
        acceptedFiles: type === RESULT_TYPE_IMAGE ? ['image/*'] : ['.csv', '.xlsx'],
        showAlerts: false

    }

    const handleChangeFile = (values) => {
        const dummy = values.map(v => {
            return { name: v.path, url: v.url }
        })
        setData(dummy)
    }

    const confirmChange = () => {
        if (!onChange) {
            return
        }

        if (type === RESULT_TYPE_INPUT && data.length > 0) {
            const inputData = data[0]
            for (const value in inputData) {
                if (Array.isArray(inputData[value])) {
                    const concat = inputData[value].join('')
                    if (!concat) {
                        enqueueSnackbar("Please input answer for all questions", { variant: "error" });
                        return
                    }
                }
                else if (!inputData[value]) {
                    enqueueSnackbar("Please input answer for all questions", { variant: "error" });
                    return
                }
            }
        }

        setOriginData(data)
        onChange(data, index)

    }

    const handleChangeResultInput = (values) => {


        setData(values)
    }

    const onClose = () => {
        if (!handleClose) {
            return
        }
        handleClose(index)

    }

    useEffect(() => {
        if (data.length === 0) {
            setDisabledConfirm(true)
            return
        }

        setDisabledConfirm(false)
    }, [data])

    useEffect(() => {
        setData([])
        switch (type) {
            case RESULT_TYPE_IMAGE:
                setPopupTitle(t("create_test.upload_result"))
                break
            case RESULT_TYPE_INPUT:
                setPopupTitle(t("create_test.input_result"))
                break
            default:
                setPopupTitle('')

        }
    }, [type]);

    return (
        <div>
            <DialogSlide
                component={

                    type === RESULT_TYPE_IMAGE || type === RESULT_TYPE_FILE ? <>
                        <DropzoneUpload config={dropzoneConfig} onChange={handleChangeFile} fileType={type} />
                    </> : type === RESULT_TYPE_INPUT ? <> <ResultInputForm amount={amount} onChange={handleChangeResultInput} multiple={multiple} /> </> : <> </>
                }
                openStatus={isOpen}
                handleCloseDialog={onClose}
                handleConfirm={confirmChange}
                dialogTitle={popupTitle}
                disabledConfirm={disabledConfirm}
                cancelType="error"
                okType="primary"
                okText="Confirm"
            />
        </div>
    );
}

export default InputResultPopup;