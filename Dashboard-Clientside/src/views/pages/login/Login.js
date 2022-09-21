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

const Login = () => {
  const history = useHistory()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [userLoggedin,setUserLoggedin] = useState(false)
  const [msd,setMsd]  =  useState("");
  const loginUser = ()=>{
    const loggedinUser = {email,password}
    console.log(loggedinUser);
    axios
    .post('http://localhost:5000', loggedinUser)
    .then((response) => {
      console.log(response);
      console.log('Hello');
      if(response.data=='Logged In succesfully'){
        setUserLoggedin(true)
        setMsd(response.data);
        history.push('/dashboard');
      }else if(response.data=='Wrong Email/Password'){
        setUserLoggedin(true)
        setMsd(response.data);
      }
    });
}



  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center" style={{ 
      backgroundImage: `url("https://media.istockphoto.com/photos/financial-graph-and-technology-element-on-mobile-phone-3d-rendering-picture-id1283432364?k=20&m=1283432364&s=612x612&w=0&h=y0lWMkB-HmmwNgUPyy0aDbpZLRBMXOjEElEwALRGOiA=")` 
    }}>
      
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody >
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
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
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" onClick={()=>loginUser()} className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                        {
        
        userLoggedin && <div> 
          <div className='text-center'> 
            {msd}
          </div>
          <div className='text-center'>
            <CButton color="danger" onClick={()=>setUserLoggedin(false)}>Close</CButton>
          </div>
      </div>
      
      }
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '30%' }} >
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
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default withRouter(Login)
