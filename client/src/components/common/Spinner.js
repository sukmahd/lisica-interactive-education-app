import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Spinner = ({ size, feedback }) => {
	const { spinnerStyle, textStyle } = styles

	return (
		<View style={spinnerStyle}>
			<ActivityIndicator
				animating
				size={size || 'large'}
			 />
			 <Text style={textStyle}>{feedback}</Text>
		</View>
	)
}

const styles = {
	spinnerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	},
	textStyle : {
		marginTop: 15,
		marginBottom: 15,
		fontSize: 18,
		marginLeft: 15
	}
}

export { Spinner };