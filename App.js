/**
 * Simple Calculator in React Native
 * Author => Lanre Adedara
 * 
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      resultText: "",
      calculationText: ""
    }
    this.operations = ['DEL', '+', '-', '*', '/']
  }
  calculateResult(){
    const text = this.state.resultText
    this.setState({
      calculationText: eval(text)
    })
  }

  buttonPressed(text) {
    if(text == '=') {
      return this.validate() && this.calculateResult()
    }

    this.setState({
      resultText: this.state.resultText + text
    })
  }

  validate() {
    const text = this.state.resultText
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  operate(operation) {
    switch (operation) {
      case 'DEL':
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop()
        if(this.operations.indexOf(lastChar) > 0){
          return;
        }
        if (this.state.resultText == '') return;
        this.setState({
          resultText: this.state.resultText + operation
        })
    
      default:
        break;
    }
  }

  render(){
    let rows = [];
    let nums = [[1,2,3], [4,5,6], [7,8,9], ['.', 0, "="]]
    for (let index = 0; index < 4; index++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        row.push(<TouchableOpacity key={nums[index][j]} onPress={() => this.buttonPressed(nums[index][j])} style={styles.btn}><Text style={styles.btntext}>{nums[index][j]}</Text></TouchableOpacity>)
      }
      rows.push(<View style={styles.row} key={index}>{row}</View>)
    }
    
    let ops = []
    for (let index = 0; index < this.operations.length; index++) {
      ops.push(<TouchableOpacity key={this.operations[index]} style={styles.btn} onPress={() => this.operate(this.operations[index])}><Text style={[styles.btntext, styles.white]}>{this.operations[index]}</Text></TouchableOpacity>)
      
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
        </View>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultText: {
    fontSize: 50,
    fontWeight: 'normal',
    color: '#000',
  },
  calculationText: {
    fontSize: 30,
    color: '#000'
  },
  btntext: {
    fontSize: 30,
    color: '#ffffff'
  },
  white: {
    color: 'white'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  result: {
    flex: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  calculation: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
  },
  operations: {
    flex: 1,
    backgroundColor: '#636363',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around'
  }
});
