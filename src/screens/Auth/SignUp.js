import React from 'react'
import { Keyboard, StyleSheet, ScrollView, View, Dimensions, Text} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar,Card, TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from "react-native-flash-message";
import {addUser} from '../../redux/actions/authAction';

const {height, width} = Dimensions.get('window');

const SignUp = ({navigation}) => {
    const [firstName, setFirstName] = React.useState(null);
    const [surname, setSurname] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [firstNameError, setFirstNameError] = React.useState(null);
    const [surnameError, setSurnameError] = React.useState(null);
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const firstNameRef = React.useRef(null);
    const surnameRef = React.useRef(null);

    const dispatch = useDispatch();
    const _saveUser = (user) => {
        dispatch(addUser(user))
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

    const _validateUser = () => {
        try {
            setIsLoading(true);
            if(firstName === null || firstName.length < 3){
                firstNameRef.current.focus();
                setFirstNameError(true);
                showMessage({
                    message: "Invalid Name Format",
                    description: "Check your name again.",
                    type: "warning",
                    icon: "warning",
                    floating: true
                });
            }
            else if(surname === null || surname.length < 3){
                surnameRef.current.focus();
                setSurnameError(true);
                showMessage({
                    message: "Invalid Name Format",
                    description: "Check your name again.",
                    type: "warning",
                    icon: "warning",
                    floating: true
                });
            }
            else if(!_validateEmail(email)){
                emailRef.current.focus();
                setEmailError(true);
                showMessage({
                    message: "Invalid email",
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
                    message: "Invalid password",
                    description: "Check password Entered.",
                    type: "warning",
                    icon: "warning",
                    floating: true
                });
            }
            else {
                let newUser = {
                    "firstName": firstName,
                    "surname": surname,
                    "email": email,
                    "password" : password
                };
                console.log('userr len : ',users)
                const user = users.find(user => {
                    if(user.email === email && user.password === password) {
                        return true;
                    }
                })
                console.log('user');
                if(user) {
                    showMessage({
                        message: "Duplicate User",
                        description: "User already exists with entered credentials.",
                        type: "info",
                        icon: "info",
                        floating: true
                    });
                }
                else {
                    console.log(newUser);
                    _saveUser(newUser);
                    alert('added');
                }
                setFirstNameError(false);
                setSurnameError(false);
                setPasswordError(false);
                setEmailError(false);
            }
            setTimeout(()=>setIsLoading(false),2000);
        } catch (error) {
            console.log('Error with sign up : ',error);
            setTimeout(()=>setIsLoading(false),2000);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <Card style={styles.cardStyle}
                    onPress={()=>Keyboard.dismiss()}
                >
                    <Card.Title
                        title="Sign Up"
                        subtitle="Fill in your details and create your free account."
                        titleStyle={{alignSelf:'center'}}
                        subtitleStyle={{alignSelf:'center'}}
                    />
                    <Card.Content
                        style={{marginTop: 40}}
                    >
                        <TextInput
                            label="First Name"
                            value={firstName}
                            onChangeText={text => setFirstName(text.trim())}
                            mode='outlined'
                            placeholder='John'
                            error={firstNameError}
                            ref={firstNameRef}
                            returnKeyType='next'
                        />
                        <TextInput
                            label="Surname"
                            value={surname}
                            onChangeText={text => setSurname(text.trim())}
                            mode='outlined'
                            placeholder='Doe'
                            error={surnameError}
                            ref={surnameRef}
                            returnKeyType='next'
                        />
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={text => setEmail(text.trim())}
                            mode='outlined'
                            placeholder='john.Doe@mail.com'
                            error={emailError}
                            ref={emailRef}
                        />
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
                            icon="account" 
                            mode="contained" 
                            onPress={() => _validateUser()}
                            style={styles.buttonStyle}
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Sign - Up
                        </Button>
                        <Button 
                            mode="text" 
                            onPress={() => navigation.push('Login')}
                            style={[styles.buttonStyle,{marginVertical: 5}]}
                        >
                            <Text style={{textDecorationLine:'underline', fontSize: 12}}>
                                Already have an account? Login
                            </Text>
                            
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
};

export default SignUp;

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
