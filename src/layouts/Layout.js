import React from "react"
import { View, Text } from "react-native"
import { Container, Tab, Tabs, Footer, FooterTab, Button, Icon } from "native-base";



class Layout extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return <>
        <Container>
            {this.props.children}
            <Footer>
                <FooterTab style={{backgroundColor: "#2980b9"}}>
                    <Button onPress={()=>this.props.navigation.navigate('ForYou')}>
                        <Icon type="FontAwesome" name="tablet" style={{color:((this.props.screen=="ForYouScreen")?"#ecf0f1":"#bdc3c7")}} />
                    </Button>
                    <Button onPress={()=>this.props.navigation.navigate('Favorite')}>
                        <Icon type="FontAwesome" name="star" style={{color:((this.props.screen=="FavoriteScreen")?"#ecf0f1":"#bdc3c7")}} />
                    </Button>
                    <Button onPress={()=>this.props.navigation.navigate('Profile')}>
                        <Icon type="FontAwesome" name="user" style={{color:((this.props.screen=="ProfileScreen")?"#ecf0f1":"#bdc3c7")}} />
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
        </>
    }
}
export default Layout;