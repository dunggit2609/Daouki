import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabList(props) {
    const { selected, data, handleChangeTab } = props
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const onChangeTab = (event, index) => {
        handleChangeTab(index);
    };
    return (
        <div>
            <Tabs indicatorColor="primary"
                textColor="inherit"
                value={selected} onChange={onChangeTab} aria-label="basic tabs example">
                {
                    data.map((d) => <Tab label={d.label} {...a11yProps(d.value)} key={a11yProps(d.value).id }/>)
                }
            </Tabs>
        </div>
    );
}

export default TabList;