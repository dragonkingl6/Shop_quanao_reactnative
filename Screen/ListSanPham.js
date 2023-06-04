import React from "react";
import { FlatList, View, StyleSheet, ScrollView, ActivityIndicator,Text } from "react-native";
import SanPham from "../Component/SanPham";
export default class ListSanPham extends React.Component {
    static navigationOptions = {
        title: 'ListSanPham',
      };
      
    constructor() {
        super();
        this.state = {
            products: null,
            show: false
        };
        this.getProducts = this.getProducts.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.displayloader = this.displayloader.bind(this);
        
    }
    componentDidMount() {
        this.getProducts();
        this.displayloader();
        
    }
    displayloader() {
        this.setState({ show: true });
        setTimeout(() => {
            this.setState({ show: false })
        }, 3000);
    }
    async getProducts() {
        const url = 'https://huyfpl.github.io/shopquanao_nhom8_agile/data.json';
        let response = await fetch(url, { method: 'GET' });
        let responseJSON = await response.json();
        this.setState({
            products: responseJSON.products,
        });

    }
  
    handlePress(dataProd) {
    const {navigation}=this.props;
       navigation.navigate('ChiTietSanPham', { data: dataProd });

    }
    renderItems({ index, item }) {
        console.log(item)
        return (

             <SanPham
                  dataProd={item}
                  handlePress={this.handlePress}
             />


        );

   }
    render() {
        
        return (
            <View>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                        {
                            this.state.show ?
                                <ActivityIndicator animating={this.state.show} color="blue" /> : <FlatList
                                    data={this.state.products}
                                    renderItem={this.renderItems}
                                    numColumns={2}
                                    
                                    removeClippedSubviews
                                />
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}