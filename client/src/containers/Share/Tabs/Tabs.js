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
  CCardHeader
} from '@coreui/react'
const Tabs = ({tabs}) => {
  const [active, setActive] = useState(0)
  return (
        <CCard>
          <CCardHeader>
            Controlled tabs
          </CCardHeader>
          <CCardBody>
            <CTabs activeTab={active} onActiveTabChange={idx => setActive(idx)}>
              <CNav variant="tabs">
                {tabs.map((tab, index) => (
                  <CNavItem>
                    <CNavLink>
                      {tab.nav}
                      {active === index && tab.name}
                    </CNavLink>
                  </CNavItem>
                ))}
              </CNav>
              <CTabContent>
                {tabs.map((tab, index) => (
                <CTabPane>
                  {`${index + 1}. ${tab.content}`}
                </CTabPane>
                ))}
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
  )
}

export default Tabs
