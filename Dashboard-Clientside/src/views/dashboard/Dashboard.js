import React, { lazy } from 'react'
import { useState ,useEffect } from 'react'
import { useTable } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css'
import Stocks from './data.json';

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import { CSmartTable } from '@coreui/react-pro'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const columns = [
  {key: 'SYMBOL',label:'Stock Name'},
  { key: 'SERIES',label:'Stock Type' },
  { key: 'OPEN',label:'Open' },
  { key: 'CLOSE',label:'Close' },
  { key: 'HIGH',label:'High'} ,
  {key: 'LOW',label:'Low'},
  {key:'TIMESTAMP',label:'Date'},
  { key: 'TOTTRDQTY',label:'Total Traded Quatity' },
  { key: 'TOTTRDVAL',label:'Total Trade Value(in CRs)' },
  { key: 'TOTALTRADES',label:'Total No. of Trades' }
  
  
]

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))
const Dashboard = () => {

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
              Stocks-Chart
              </h4>
              <div className="small text-medium-emphasis">April - October 2021</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['April','May', 'June', 'July', 'August', 'September', 'October'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
        {/* <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center"> */}
            {/* <CCol className="mb-sm-2 mb-0">
              <div className="text-medium-emphasis">Visits</div>
              <strong>29.703 Users (40%)</strong>
              <CProgress thin className="mt-2" color="success" value={40} />
            </CCol> */}
            {/* <CCol className="mb-sm-2 mb-0">
              <div className="text-medium-emphasis">Unique</div>
              <strong>24.093 Users (20%)</strong>
              <CProgress thin className="mt-2" color="info" value={40} />
            </CCol>
            <CCol className="mb-sm-2 mb-0">
              <div className="text-medium-emphasis">Pageviews</div>
              <strong>78.706 Views (60%)</strong>
              <CProgress thin className="mt-2" color="warning" value={40} />
            </CCol>
            <CCol className="mb-sm-2 mb-0">
              <div className="text-medium-emphasis">New Users</div>
              <strong>22.123 Users (80%)</strong>
              <CProgress thin className="mt-2" color="danger" value={40} />
            </CCol>
            <CCol className="mb-sm-2 mb-0">
              <div className="text-medium-emphasis">Bounce Rate</div>
              <strong>Average Rate (40.15%)</strong>
              <CProgress thin className="mt-2" value={40} />
            </CCol> */}
          {/* </CRow>
        </CCardFooter> */}
      </CCard>

      <WidgetsBrand withCharts />

      <CRow>
        <CCol xs>
          {/* <CCard className="mb-4"> */}
            {/* <CCardHeader>Traffic {' & '} Sales</CCardHeader> */}
            {/* <CCardBody> */}
              {/* <CRow> */}
                {/* <CCol xs={12} md={6} xl={6}> */}
                  {/* <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow> */}

                  {/* <hr className="mt-0" /> */}
                  {/* {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))} */}
                {/* </CCol> */}

                {/* <CCol xs={12} md={6} xl={6}> */}
                  {/* <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow> */}

                  {/* <hr className="mt-0" /> */}

                  {/* {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))} */}

                  {/* <div className="mb-5"></div> */}

                  {/* {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))} */}
                {/* </CCol> */}
              {/* </CRow> */}

              <br />
              {/* <CSmartTable  columnFilter columnSorter pagination tableProps={{hover: true}}> */}
              <h3>
              NSE-Stocks
              </h3>
                <CTable align="middle" className="mb-0 border text-center" hover responsive >
                
                {/* <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.."> */}
                {/* <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">Stock Code</CTableHeaderCell> */}
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    {/* <CTableHeaderCell className="text-center">Stock Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Stock Type</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Open</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">High</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Low</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Close</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Total Traded Qty.</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Total Trade Value</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Total No. Of Trades</CTableHeaderCell>
                  </CTableRow>
                </CTableHead> */}
                <CSmartTable items={Stocks} columns={columns}  columnFilter columnSorter pagination tableProps={{hover: true}}/>
                {/* <CTableBody>
                  {Stocks.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                         <div>{item.ISIN}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.SYMBOL}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <div>{item.SERIES}</div>
                        
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <div>{item.OPEN}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <div>{item.HIGH}</div>
                        
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <div>{item.LOW}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <div>{item.CLOSE}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <div>{item.TOTTRDQTY}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <div>{item.TOTTRDVAL}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <div>{item.TOTALTRADES}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody> */}
              </CTable>
            {/* </CSmartTable> */}
            {/* </CCardBody>
          </CCard> */}
        </CCol>
      </CRow>
    </>
    
  )
}

export default Dashboard
