import { Colors, Fonts } from "@utils/Constants";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize'


import React from 'react'

const CustomText = ({
    varient ,
    fontFamily = Fonts.Regular,
    fontSize,
    children,
    numberOfLines,
    onLayout,
    style,
    ...props
}) => {

    let computedFontSize;

    switch (varient) {
        case 'h1':
            computedFontSize = RFValue(fontSize || 22);
            break;
        case 'h2':
            computedFontSize = RFValue(fontSize || 20);
            break;
        case 'h3':
            computedFontSize = RFValue(fontSize || 18);
            break;
        case 'h4':
            computedFontSize = RFValue(fontSize || 16);
            break;
        case 'h5':
            computedFontSize = RFValue(fontSize || 14);
            break;
        case 'h6':
            computedFontSize = RFValue(fontSize || 12);
            break;
        case 'h7':
            computedFontSize = RFValue(fontSize || 12);
            break;
        case 'h8':
            computedFontSize = RFValue(fontSize || 10);
            break;
        case 'h9':
            computedFontSize = RFValue(fontSize || 9);
            break;
        case 'body':
            computedFontSize = RFValue(fontSize || 12);
            break;

    }

    const fontFamilyStyle = {
        fontFamily
    }


    return (

        <Text 
        className="text-left"
        style={[
            {color:Colors.text , fontSize:computedFontSize},
            fontFamilyStyle,
            style
            
        ]}
        numberOfLines={numberOfLines !== undefined ?numberOfLines : undefined}
        >{children}</Text>
    )
}

export default CustomText