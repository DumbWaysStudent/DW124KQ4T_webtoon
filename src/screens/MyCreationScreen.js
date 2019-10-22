import React from "react";
import { View, Text, Container, Content, CardItem, Fab, Icon, Body } from "native-base";
import { FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";


import env from '../utils/Env';
import Toon  from '../services/Toon';
import { saveToon, saveNewToon, saveUpdatedToon, saveToonTemp } from '../_actions/mytoon';
import { saveAll, saveBanner } from '../_actions/toon';


class MyCreationScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarVisible: false
        };
    }


    constructor(props){
        super(props);
        this.state = {
            sending: 0,
            isRefreshing: false
        }
    }

    async componentDidMount(){
            await this.onLoad();
    }

    onLoad = async () => {
        
        let myToon = [];
        this.setState({
            isRefreshing: true
        });
        try{
            myToon = (await Toon.myToon()).data.data.data;
        }
        catch(err){
            console.log(err);
        }

        this.props.dispatch(saveToon(myToon));
        this.setState({
            isRefreshing: false
        });
    }

    async componentDidUpdate(prevProps, prevState){
        // if(prevState.items === this.state.items) {
        //     if(typeof this.props.navigation.state.params !== "undefined"){
        //         if(this.props.navigation.getParam('isNew') === true){
        //                 await this.onSubmitNew({
        //                     image: "",
        //                     title: this.props.navigation.getParam("title")
        //                 });
        //         }
        //         if(typeof this.props.navigation.getParam('onEdit') !== "undefined"){
        //             var id = this.props.navigation.getParam('onEdit');
        //             await this.onSubmitUpdate({
        //                 title: this.props.navigation.getParam('title'),
        //                 image: this.props.navigation.getParam('image')
        //             }, id);

        //         }
        //     }
        // }

        if(this.props.mytoon.newToon!=null && this.props.navigation.getParam("isEdit")==null){
            try{
                (await this.onSubmitNew(this.props.mytoon.newToon));
            }
            catch(err){
                console.log(err);
            }
        }
        if(this.props.mytoon.newToon!=null && this.props.navigation.getParam("isEdit")!=null){
            try{
                (await this.onSubmitUpdate(this.props.mytoon.newToon, this.props.mytoon.newToon.id));
            }
            catch(err){
                console.log(err);
            }
        }
        if(typeof this.props.navigation.getParam('onDelete') !== "undefined"){
            var id = this.props.navigation.getParam('onDelete');
            try{
                await this.onDelete(id);
            }
            catch(err){
                console.log(err);
            }
        }
    }

    onDelete = async (id) => {
        this.props.navigation.setParams({onDelete: undefined});
        try {
            await Toon.delete(id);
            let toons = this.props.mytoon.toons.filter((item)=> item.id !== id);
            this.props.dispatch(saveToon(toons));
            let allToon = this.props.toon.all.filter((item)=> item.id !== id);
            this.props.dispatch(saveAll(allToon));
            let bannerToon = this.props.toon.banners.filter((item)=> item.id !== id);
            this.props.dispatch(saveBanner(bannerToon));
        }
        catch(err){
            console.log(err);
            console.log(err.response);
        }
    }

    onSubmitUpdate = async (data, id) => {
        try{
            let result = (await Toon.update(data, id)).data.data.data;
            let items = this.props.mytoon.toons;
            let index = items.findIndex(item => item.id === id);
            items[index] = result;
            this.props.navigation.setParams({isEdit: false});
            this.props.dispatch(saveToon(items));
            this.props.dispatch(saveUpdatedToon(null));
            this.props.dispatch(saveNewToon(null));
            if(!result.isDraft){
                let allToon = this.props.toon.all;
                let bannerToon = this.props.toon.banners;
                let indexAll = allToon.findIndex(item => item.id === id);
                let indexBanner = bannerToon.findIndex(item => item.id === id);
                if(indexAll>=0){
                    allToon[indexAll] = result;
                }
                else{
                    allToon.unshift(result);
                }
                if(indexBanner>=0){
                    bannerToon[indexBanner] = result;
                }
                else{
                    bannerToon.unshift(result);
                }
                this.props.dispatch(saveAll(allToon));
                this.props.dispatch(saveBanner(bannerToon));
            }
        }
        catch(err){
            console.log(err);
            console.log(err.response);
        }
    }

    onSubmitNew = async (data) => {
        let temp = this.props.mytoon.tempToons;
        if(temp.filter((item)=>item.time===data.time)[0]===undefined){
            try{
                let result = (await Toon.create({image:data.image, title:data.title})).data.data.data;
                let items = this.props.mytoon.toons;
                items.unshift(result);
                temp.push(data);
                if(!result.isDraft){
                    let allToon = this.props.toon.all;
                    let bannerToon = this.props.toon.banners;
                    allToon.unshift(result);
                    bannerToon.unshift(result);
                    this.props.dispatch(saveAll(allToon));
                    this.props.dispatch(saveBanner(bannerToon));
                }
                this.props.dispatch(saveToon(items));
                this.props.dispatch(saveNewToon(null));
                this.props.dispatch(saveToonTemp(temp));
            }
            catch(err){
                console.log(err);
            }
        }
    }

    onDetailTitle = (id) => {
        var item = this.state.items.filter((item, index)=> item.id === id)[0];
        this.props.navigation.navigate("DetailTitle", item);
    }

    render(){
        return (
            <Container>
                <Content>
                    <CardItem>
                        <Body style={{flex: 1, flexDirection: "row"}}>
                            <FlatList
                                onRefresh={this.onLoad}
                                refreshing = {this.state.isRefreshing}
                                data = {this.props.mytoon.toons}
                                keyExtractor = {item => item.id.toString()}
                                renderItem = {({item})=>(
                                    <View style={styles.itemWrap}>
                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("EditToon", {id:item.id})}>
                                            {item.image==="" ?
                                            <View style={styles.itemImage} />
                                            : 
                                            <Image style={styles.itemImage}
                                                source={{uri: `${env.baseUrl}/${item.image}`}} />
                                            }
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.itemTextWrap} onPress={()=>this.props.navigation.navigate("EditToon", {id:item.id})} style={{marginLeft: 20}}>
                                            <View>
                                                <Text style={styles.labelTitle}>{item.title} {`${(item.isDraft)?"(draft)":""}`}</Text>
                                                <Text style={styles.labelTotalEpisode}>{ item.totalEpisode } episode(s)</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </Body>
                    </CardItem>
                </Content>
                <Fab
                    active={false}
                    direction="up"
                    style={{ backgroundColor: '#3498db' }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate("CreateNew")}>
                        <Icon name="plus" type="FontAwesome" />
                </Fab>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    itemImage: {width: 65, height: 65, borderWidth: 1, borderColor: "#000"},
    itemTextWrap: {marginLeft: 20},
    labelTitle: {marginBottom: 5, marginTop: 5},
    labelTotalEpisode: {color: "#bdc3c7"},
    itemWrap: {flex: 1, flexDirection:'row', marginBottom: 15}
});

const mapStateToProps = (state) => ({
    mytoon: state.mytoon,
    toon: state.toon
})

export default connect(mapStateToProps)(MyCreationScreen);