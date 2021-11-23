import React from 'react'
import { Keyboard, StyleSheet, ScrollView, View, Dimensions, Text} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar,Card, TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import {authUser} from '../../redux/actions/authAction';

const {height, width} = Dimensions.get('window');

const Login = ({navigation}) => {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);

    const dispatch = useDispatch();
    const _authUser = (user) => {
        dispatch(authUser(user))
    };

    const users = useSelector(state => state.authReducer.users);

    const _validateEmail = (text) => {
        console.log('email sent is : ',text);
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(text) === false) {
            console.log("Email is Not Correct");
            return false;
        }
        else {
            console.log("Email is Correct");
            return true
        }
    }

    React.useEffect(()=>{
        console.log(users, typeof users);
    },[]);

    const _validateUser = () => {
        try {
            if(!_validateEmail(email)){
                emailRef.current.focus();
                setEmailError(true);
                showMessage({
                    message: "Incorrect or Invalid email",
                    description: "Check Email Address Entered.",
                    type: "warning",
                    icon: "warning",
                    floating: true
                });
            }
            else if(password === null || password.length < 6) {
                passwordRef.current.focus();
                setPasswordError(true);
                showMessage({
                    message: "Incorrect or Invalid password",
                    description: "Check password Entered.",
                    type: "warning",
                    icon: "warning",
                    floating: true
                });
            }
            else if(users.length === 0){
                showMessage({
                    message: "The App has no users signed on to the app",
                    description: "Sign up to start using the app.",
                    type: "info",
                    icon: "info",
                    floating: true,
                    duration: 5000
                });
            }
            else {
                const user = users.find(user =>{
                    if(user.email === email && user.password === password) {
                        return true
                    }
                    else return false;
                })
                if(user) {
                    _authUser(user);
                }
                else{
                    showMessage({
                        message: "Login Incorrect",
                        description: "User does not exist.",
                        type: "info",
                        icon: "info",
                        floating: true,
                    });
                }
                setPasswordError(false);
                setEmailError(false);
            }
        } catch (error) {
            console.log('Error :',error)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <Card style={styles.cardStyle}
                    onPress={()=>Keyboard.dismiss()}
                >
                    <View style={styles.avatarViewStyle}>
                        <Avatar.Icon size={64} icon="account" />
                    </View>
                    <Card.Title
                        title="User Login"
                        subtitle="Login to user app features"
                        titleStyle={{alignSelf:'center'}}
                        subtitleStyle={{alignSelf:'center'}}
                    />
                    <Card.Content
                        style={{marginTop: 40}}
                    >
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        mode='outlined'
                        placeholder='john.Doe@mail.com'
                        error={emailError}
                        ref={emailRef}
                    />
                    <View style={{marginVertical: 5}}/>
                    <TextInput
                        label="Password"
                        mode='outlined'
                        secureTextEntry
                        error={passwordError}
                        placeholder='*********'
                        value={password}
                        onChangeText={text => {setPassword(text)}}
                        ref={passwordRef}
                        right={<TextInput.Icon name="eye" />}
                    />
                    </Card.Content>
                    <Card.Actions
                        style={styles.cardActionStyle}
                    >
                        <Button 
                            icon="login" 
                            mode="contained" 
                            onPress={() => _validateUser()}
                            style={styles.buttonStyle}
                        >
                            Sign - In
                        </Button>
                        <Button 
                            mode="text" 
                            onPress={() => navigation.push('SignUp')}
                            style={[styles.buttonStyle,{marginVertical: 5}]}
                        >
                            <Text style={{textDecorationLine:'underline'}}>
                                Not a user? Sign - Up
                            </Text>
                            
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    cardStyle: {
        flex:1,
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 50,
        borderRadius: 20,
    },
    avatarViewStyle: {
        alignSelf:'center',
        marginTop: 20,
    },
    cardActionStyle: {
        marginTop: 20,
        marginBottom: 10,
        alignSelf:'center',
        flexDirection:'column',
    },
    buttonStyle: {
        height: 40,
        alignItems:'center',
        justifyContent:'center',
    },
});
