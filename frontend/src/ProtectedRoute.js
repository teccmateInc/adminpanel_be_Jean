import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { strictValidObjectWithKeys } from "./helper/utils"
const ProtectedRoute = ({ isAdmin, isSuperAdmin, isCandidate, isUpper, isLower, component: Component, ...rest }) => {
  const { user } = useSelector(state => state.login);
  console.log(user)
  const history=useHistory();
  useEffect(() => {
    // console.log(user)
    // console.log(user.type)
    if (strictValidObjectWithKeys(user) && user.type) {
      history.push("/profile")
    }
  }, [user])
  return (
    <>
      <Route {...rest}
      exact
        render={(props) => {
          if (strictValidObjectWithKeys(user) && user.type) {
            // if(user.success === false){
            //     return <Redirect to="/login" />
            // }
            // if(isUpper === true && user.type !=='admin' && user.type !=='superadmin' ){
            //   return <Redirect to="/login" />
            // }
            // if(isLower === true && user.type !=='admin' && user.type !=='superadmin' && user.type !=='candidate' ){
            //   return <Redirect to="/login" />
            // }
            // if(isAdmin === true && user.type !=='admin' ){
            //   return <Redirect to="/login" />
            // }
            // if(isSuperAdmin === true && user.type !=='superadmin' ){
            //   return <Redirect to="/login" />
            // }
            // if(isCandidate === true && user.type !=='candidate')
            // {return <Redirect to="/login" />}
            return <Component {...props} />
          }
          else {
            console.log('user',user)
            return <Redirect to="/login" />
          }
        }} />
    </>
  )
}

export default ProtectedRoute
