import {Flex ,Heading} from '@chakra-ui/react'
import styled from '@emotion/styled';
import {useRouter} from 'next/router'
import Cookie from 'js-cookie'
import axios from 'axios'
import {GoogleLogin} from 'react-google-login'



const GoogleWrapper = styled(Flex)`
  background-color:white;
  button{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black !important;
    font-weight: bold !important;
  }
  `;

  const axiosApiCall = (url, method, body = {}) => 
  axios({
      method,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
      data: body,
  })
  const Index = () => {

    const router = useRouter()

    const onSuccess = (response) => {
        const access_token = response.accessToken;
        axiosApiCall('api/user/oauth/google', 'post', {access_token})
        .then((res) => {
            const  {user, token} = res.data;
            Cookie.set("token", token)
            router.push('/')
        })
    }
    
    return(
  <Flex flexDir="column" align="center" bg="green.800" justify="center" height="100vh">
      <Heading maxW="800px" color="white" textAlign="center">
        Google Oauth in Next JS , node and express. 
      </Heading>

      <GoogleWrapper>
        <GoogleLogin 
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} 
        buttonText="Sign up with Google"
        onSuccess={onSuccess}
        onFailure={() => {}}
        />
      </GoogleWrapper>
  </Flex>
);
}
export default Index
