import { InferGetServerSidePropsType } from "next"
import { CtxOrReq } from "next-auth/client/_utils"
import {  getSession, signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

export default function SignUp({  }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [errorMessages, setErrorMessages] = useState<string>("")

    const router = useRouter()


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    

    const target = e.currentTarget as typeof e.currentTarget & {
      email: { value: string }
      password: { value: string }
      passwordConfirm: { value: string }
      name: { value: string }
    }


    if (target.password.value !== target.passwordConfirm.value) {
      setErrorMessages("Passwords do not match")
      return
    }


    const result = await signIn('register',
    {
      redirect: false,
      email: target.email.value,
      name: target.name.value,
      password: target.password.value,
    })

    if (result && result.error) {
      setErrorMessages(result.error)

    } else {
      router.push('/profile')
    }

 
  

    


  }
 


    return (
        <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title>CS308-Register-Sprint0</title>
        <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css?h=f1a8fe9e98944b9d682ec5c3efac8f17" />
        {/* Start: Navbar Right Links */}
        <nav className="navbar navbar-light navbar-expand-md py-3" style={{backgroundColor: '#6D6A75'}}>
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier">
                  <path fillRule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                  <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z" />
                </svg>
              </span>
              <span>Scoutff</span>
            </a>
            <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
            <div className="collapse navbar-collapse" id="navcol-1" style={{backgroundColor: '#6D6A75'}}>
              <input type="search" style={{/*position: 'absolute', *//*alignSelf: 'center', *//*alignItems: 'center', *//*textAlign: 'center', */marginLeft: '400px'}} />
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Me&nbsp;</a>
                  <div className="dropdown-menu"><a className="dropdown-item" href="#">Profile</a><a className="dropdown-item" href="#">Messages</a><a className="dropdown-item" href="#">Privacy &amp; Security</a></div>
                </li>
                <li className="nav-item"><a className="nav-link" href="#">⭐ Favourite Players&nbsp;</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {/* End: Navbar Right Links */}
        <div className="container">
          {/* Start: Login Form Basic */}
          <section className="position-relative py-4 py-xl-5">
            <div className="container">
              <div className="row mb-5">
                <div className="col-md-8 col-xl-6 text-center mx-auto">
                  <h2>Register</h2>
                  <p className="w-lg-50" />
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-md-6 col-xl-4">
                  <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                      <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                      </div>
                      <form onSubmit={handleFormSubmit} className="text-center" method="post">
                        <div className="mb-3"><input required className="form-control" type="text" name="name" placeholder="Name" /></div>
                        <div className="mb-3"><input required className="form-control" type="email" name="email" placeholder="Email" /></div>
                        <div className="mb-3"><input required className="form-control" type="password" name="password" placeholder="Password" /></div>
                        <div className="mb-3"><input required className="form-control" type="password" name="passwordConfirm" placeholder="Confirm Password" /></div>
                        
                        <div className="mb-3"><button  className="btn btn-primary d-block w-100" type="submit">Register</button></div>
                      </form>
                      <Link href="/auth/signup">
                        <a className="text-decoration-none">Already have an acouunt? Sign in</a>
                      </Link>
                      {errorMessages && <div className="text-danger">{errorMessages}</div>}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* End: Login Form Basic */}
        </div>
      </div>
    )

    
}

export  const getServerSideProps = async (context : CtxOrReq  ) => {
    const session = await getSession(context)


    
    if (session) {
        return {
        redirect: {
            destination: '/profile',
            permanent: false,
        },
        }
    }
    
    return {
        props: {  },
    }
    }
