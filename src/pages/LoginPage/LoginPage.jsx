import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useRouteMatch } from 'react-router-dom';
import { fetchIt } from '../../helpers/fetchIt';
import style from './LoginPage.module.scss';

export function LoginPage(props) {

    let loginData = props.loginData
    let setLoginData = props.setLoginData

    //const [loginData, setLoginData] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm()
    let { url } = useRouteMatch()

    const onSubmit = async (data, event) => {
        event.target.reset();
        let formData = new URLSearchParams()
        formData.append('username', data.username)
        formData.append('password', data.password)

        let url = `https://api.mediehuset.net/token`

        let res = await fetchIt(url, 'POST', formData)

        test(res)
    }

    const test = (res) => {
        if (!res.message) {
            setLoginData(res)
            sessionStorage.setItem('token', JSON.stringify(res))
        }

        if (res.message === 'No authorization') {
            console.log('Forkert brugernavn eller password. Prøv igen.')
        }
    }

    const signOut = () => {
        setLoginData([])
        sessionStorage.removeItem('token')
    }

    return (
        <div id={style.container}>
            <div>
                {loginData.username ?
                <div className={style.loggedin}>
                    <h1>{`Du er logget ind, ${loginData.username}.`}</h1>
                    <button onClick={() => signOut()}>Log ud</button>
                    <Link to={`${url}/mit-program`}><button>Mit program</button></Link>
                </div> :
                <div>
                    <h1>Login</h1>

                    <div>
                        <h3>Indtast login oplysninger</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>Brugernavn</label>
                            <input name="username" placeholder="Indtast dit brugernavn" {...register('username', { required: true })}/>
                                {errors.username && <p>Udfyld brugernavn</p>}
                            
                            <label>Adgangskode</label>
                            <input name="password" placeholder="Indtast din adgangskode" type="password" {...register('password', { required: true })}/>
                                {errors.password && <p>Udfyld adgangskode</p>}

                            <button>Login</button>
                        </form>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}