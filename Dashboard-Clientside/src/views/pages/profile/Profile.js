import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useHistory , withRouter } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Profile = () => {
  const history = useHistory()
  const[fName,setFirstName]=useState("")
  const[lName,setLastName]=useState("")
  const [email,setEmail]=useState("")
  const [mobile,setMobile]=useState("")
//   const [password,setPassword]=useState("")
  const [userProfile,setUserProfile] = useState(false)
  const [msd,setMsd]  =  useState("");
  const profileEdit = ()=>{
    const userDetails = {fName,lName,email,mobile}
    console.log(userDetails);
    
    axios
    .post('http://localhost:5000/profile', userDetails)
    .then((response) => {
      console.log(response);
      console.log('Hello');
      if(response.data=='Editted succesfully'){
        setUserProfile(true)
        setMsd(response.data);
        history.push('/dashboard');
      }else if(response.data=='Details not saved'){
        setUserProfile(true)
        setMsd(response.data);
      }
    });
}

return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      
      <CContainer>
        <CRow className="justify-content-left">
          <CCol md={8}>
            
              {/* <CCard className="p-4"> */}
                {/* <CCardBody > */}
                  <CForm>
                    <h1>Profile</h1>
                    <p className="text-medium-emphasis">Account Details</p>

                    <CInputGroup className="mb-3">
                      {/* <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText> */}
                      <p>First Name &nbsp;&nbsp;</p>
                      <CFormInput  value={fName} onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name" autoComplete="fName" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      {/* <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText> */}
                      <p>Last Name &nbsp;&nbsp;</p>
                      <CFormInput value={lName} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name" autoComplete="lName" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      {/* <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText> */}
                      <p>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                      <CFormInput value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      {/* <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText> */}
                      <p>Mobile &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                      <CFormInput value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Mobile" autoComplete="mobile" />
                    </CInputGroup>
                    {/* <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        value={password}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e)=>setPassword(e.target.value)}

                      />
                    </CInputGroup> */}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" onClick={()=>profileEdit()} className="px-4">
                          Save
                        </CButton>
                      </CCol>
                      <CCol xs={6}>
                        <CButton color="primary" onClick={()=>profileEdit()} className="px-4">
                          Cancel
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/* <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton> */}
                        {
        
        userProfile && <div> 
          <div className='text-center'> 
            {msd}
          </div>
          {/* <div className='text-center'>
            <CButton color="danger" onClick={()=>setUserLoggedin(false)}>Close</CButton>
          </div> */}
      </div>
      
      }
                      </CCol>
                    </CRow>
                  </CForm>
                {/* </CCardBody> */}
              {/* </CCard> */}
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '30%' }} >
                <CCardBody className="text-center">
                  <div >
                    <h3>Welcome to Stocks Analyzer</h3>
                    <p style={{color: "#A7BBC7"}}>
                       Do not Have Account. Register Now!!
                    </p>
                    <Link to="/register">
                      <CButton color="primary"  className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default withRouter(Profile)