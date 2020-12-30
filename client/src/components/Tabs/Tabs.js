import React, { useState } from 'react'
import {
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
    CTabPane,
    CCard,
    CCardBody,
    CTabs,
} from '@coreui/react'

import tabNavs from './_navs'
import contents from './_contents'
const Tabs = () => {
    const [active, setActive] = useState(1)
    return (
        <CCard>
            <CCardBody>
                <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
                    <CNav variant="tabs">
                        {tabNavs.map((nav, index) => (
                            <CNavItem>
                                <CNavLink>
                                    {nav.icon}
                                    {active === index && nav.tabName}
                                </CNavLink>
                            </CNavItem>
                        ))}
                    </CNav>
                    <CTabContent>
                        {contents.map((content) => (
                            <CTabPane>
                                {content}
                            </CTabPane>
                        ))}
                    </CTabContent>
                </CTabs>
            </CCardBody>
        </CCard>
    )
}

export default Tabs
