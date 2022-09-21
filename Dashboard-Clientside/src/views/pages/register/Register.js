import React,{useState} from 'react'
import axios from "axios"
import { useHistory , withRouter } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
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



const Register = () => {
  const history = useHistory();
  const [fullname,setfullName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [userRegistered,setUserRegistered] = useState(false)
  const [msd,setMsd]  =  useState("");
  const registerUser = ()=>{

    const registerdUser = {fullname,email,password}
    console.log(registerdUser);

    axios
      .post('http://localhost:5000/register', registerdUser)
      .then((response) => {
        console.log(response);
        if(response.data=='User registered succesfullly'){
          setUserRegistered(true)
          setMsd(response.data);
          // history.push('/');
        }else if(response.data=='User already registered'){
          setUserRegistered(true)
          setMsd(response.data);

        }
      });
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" style={{ 
      backgroundImage: `url("https://media.istockphoto.com/photos/business-analysis-stock-chart-in-crisis-for-investment-in-stockmarket-picture-id1216513058?k=20&m=1216513058&s=612x612&w=0&h=09oOEQQEAN1JwgrsoULFrqq_QzeAvTYlPiwSJey2Ztg=")` 
    }}>
      {/* {
        userRegistered && <div>
          <div>
            {msd}
          </div>
          <div>
            <button onClick={()=>setUserRegistered(false)}>Close</button>
          </div>
      </div>

      } */}

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput value={fullname} onChange={(e)=>setfullName(e.target.value)} placeholder="Name" autoComplete="fullname" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      value={password}
                      placeholder="Password"
                      autoComplete="new-password"
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  {/* <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup> */}
                  <div className="d-grid">
                    <CButton color="success" onClick={()=>registerUser()}>Create Account</CButton>
                  </div>
                  <div className="container signin">
                    <p>Already have an account? <a href="/"><b>Sign in</b></a>.</p>
                  </div>
                  {
        userRegistered && <div >
          <div className='text-center'>
            {msd}
          </div>
          <div className="text-center">
            <CButton  color="primary" onClick={()=>setUserRegistered(false)}>Close</CButton>
          </div>
      </div>

      }

                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default withRouter(Register)
