import React from 'react';
import {
	TextInput,
	View,
	Text
} from 'react-native';

const InputRounded = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
	const { inputStyle, labelStyle, containerStyle } = styles;

	return (
		<View style={containerStyle}>
			<TextInput
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				autoCorrect={false}
				autoCapitalize='none'
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
		paddingLeft: 5,
		fontSize: 18,
		lineHeight: 23,
		flex: 2,
		underlineColorAndroid: 'transparent'
	},
	labelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 1
	},
	containerStyle: {
		height: 40,
		width: 200,
		flexDirection : 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 50,
		borderColor: '#d0e9ea',
		borderWidth: 0.8
	}
}

export { InputRounded };