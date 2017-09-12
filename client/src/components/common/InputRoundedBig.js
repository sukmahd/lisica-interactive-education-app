import React from 'react';
import {
	TextInput,
	View,
	Text
} from 'react-native';

const InputRoundedBig = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
	const { inputStyle, labelStyle, containerStyle } = styles;

	return (
		<View style={containerStyle}>
			<TextInput
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				autoCorrect={false}
				autoCapitalize='none'
				underlineColorAndroid= 'rgba(0,0,0,0)'
				style={inputStyle}
				value={value}
				onChangeText={onChangeText}
			/>
		</View>
	)
};

const styles = {
	inputStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 20,
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 20,
		lineHeight: 23,
		flex: 2
	},
	labelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 1
	},
	containerStyle: {
		height: 50,
		width: 260,
		flexDirection : 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 50,
		borderColor: '#d0e9ea',
		borderWidth: 0.8
	}
}

export { InputRoundedBig };