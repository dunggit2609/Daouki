import React from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import { uploadToServer } from 'core/helper/uploadToServer';
import { LinearProgress } from '@mui/material';

import './styles.scss'
import { useState, useEffect } from 'react';
import { UseSpinnerLoading } from 'hooks/useSpinnerLoading';
import { useSnackbar } from 'notistack';
DropzoneUpload.propTypes = {

};

function DropzoneUpload(props) {
    const { config, onChange, fileType } = props
    const { filesLimit, showPreviews, showPreviewsInDropzone, showFileNamesInPreview, previewText, acceptedFiles, showAlerts } = config
    const [isLoading, setIsLoading] = useState(false)
    const { handleDisplaySpinner } = UseSpinnerLoading()
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = async (files) => {
        if (!files || files.length === 0) {
            return
        }
        try {
            for (let i = 0; i < files.length; i++) {
                if (files[i].url) {
                    continue
                }
                handleDisplaySpinner(true)
                setIsLoading(true)
                const formData = new FormData();
                formData.append("file", files[i]);
                const url = await uploadToServer(formData, fileType)

                // const url = 
                handleDisplaySpinner(false)
                setIsLoading(false)

                if (!url) {
                    continue
                }
                files[i].url = url

            }
        } catch (err) {
            handleDisplaySpinner(false)
            setIsLoading(false)
            enqueueSnackbar(err.message, { variant: "error" });

        }


        if (!onChange) {
            return
        }

        onChange(files)

    }

    return (
        <div style={{ height: 100 + '%' }}>
            {isLoading && <LinearProgress />}
            <br />
            <DropzoneArea
                filesLimit={filesLimit}
                onChange={(files) => handleChange(files)}
                showFileNamesInPreview={showFileNamesInPreview}
                showPreviews={showPreviews}
                showPreviewsInDropzone={showPreviewsInDropzone}
                previewText={previewText}   
                acceptedFiles={acceptedFiles}
                maxFileSize={10000000}
                style={{ height: 100 + '%' }}
                showAlerts={showAlerts}
            />


        </div>
    );
}

export default DropzoneUpload;