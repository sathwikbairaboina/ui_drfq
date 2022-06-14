export const defaultFormFields ={
'0':{
 label: 'First Name',
 type:'Input'
},
'1':{
 label: 'Last Name',
 type:'Input'
},
'2':{
 label: 'Price',
 type:'PriceInput'
},

'3':{
 label: 'Quantity',
 type:'NumberInput',
 min: 1,
 max:100,
},
'4':{
 label: 'Payment Method',
 type:'Select',
 options:['Online' ,'Cash' ,"Card"]
},
'5':{
 label: 'Date',
 type:'DatePicker',
},
'6':{
 label: 'Description',
 type:'TextAreaInput'
},
}