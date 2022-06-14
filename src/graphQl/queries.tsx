import {API} from 'aws-amplify/lib/index';
import {get} from 'lodash';
import gql from 'graphql-tag';
import AWSAppSyncClient, {AUTH_TYPE} from 'aws-appsync';


export const client = new AWSAppSyncClient({
  url: 'https://l7p3jy3a7rex3l3shxxfry37ze.appsync-api.us-east-1.amazonaws.com/graphql',
  region: 'us-east-1',
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: 'da2-747n5paktbhpffc6yepark436q',
  },
  disableOffline: true,
});




export const getAllServices = ():Promise<any> =>
  client
    .query({
      query: gql(`query getAllServices{
      getAllServices{
          id
          name
          description
          rfqBasicFormDetails{
            label
            type
            options{
              text
              value
            }
          }
          rfqSteps{
           title
           description
          }
        }
      }`)
    })
    .then(({data}:any) => data.getAllServices);

 export const getAllRfq = ():Promise<any>  =>
   client
    .query({
      query: gql(`query getAllRfq{
      getAllRfq{
          id
          userName
          userId
          basicFormDetails{
            label
            type
            value
            options{
              text
              value
            }           
          }
          status
          additionalDetails
          pdfUrl
        }
      }`)
    })
    .then(({data}:any) => data.getAllRfq);

export const getAllUserRfq = (name:string):Promise<any>  =>
   client
    .query({
      variables: {name},
      query: gql(`query getRfqByUserName($name: String!){
      getRfqByUserName(name: $name ){
          id
          userName
          userId
          basicFormDetails{
            label
            type
            value
            options{
              text
              value
            }           
          }
          service{
            rfqSteps{
              title
              description

            }
          }
          status
          additionalDetails
        }
      }`)
    })
    .then(({data}:any) => data.getRfqByUserName);

export const getServiceById = (id: string) =>
  client
    .query({
      variables: {id},
      query: gql(`query getServiceById($id: ID!){
      getServiceById(id: $id ){
          id
          name
          description
          rfqBasicFormDetails{
            id
            label
            type
            value
            options{
              text
              value
            }
          }
          rfqSteps{
            id
           title
           description
          }
        }
      }`)
    })
    .then(({data}:any) => data.getServiceById);

 export const getRfqById = (id: string) =>
  client
    .query({
      variables: {id},
      query: gql(`query getRfqById($id: ID!){
      getRfqById(id: $id ){
          id
          userName
          userId
          basicFormDetails{
            label
            type
            value
            options{
              text
              value
            }           
          }
          service{
            name
            description
            rfqSteps{
              title
              description
            }
          }
          status
          additionalDetails
          pdfUrl
        }
      }`)
    })
    .then(({data}:any) => data.getRfqById);

    export const deleteRfq = () =>
  client
    .query({
      query: gql(`query deleteRfq{
      deleteRfq{
          id
          name
          description
        }
      }`)
    })
    .then(({data}) => data);

export const deleteService = () =>
  client
    .query({
      query: gql(`query deleteService{
      deleteService{
          id
          name
          description
        }
      }`)
    })
    .then(({data}) => data);

export const createOrUpdateRfq = (rfq:any) =>
  client
    .mutate({
      variables: {rfq},
      mutation: gql(`mutation createOrUpdateRfq($rfq: RfqInput!){
      createOrUpdateRfq(rfq: $rfq){
          id
          userName
        }
      }`)
    })
    .then(({data}:any) => data.createOrUpdateRfq);

export const createOrUpdateService = (service:any) =>
  client
    .mutate({
      variables: {service},
      mutation: gql(`mutation createOrUpdateService($service: ServiceInput!){
      createOrUpdateService(service: $service){
          id
          name
          description
          rfqBasicFormDetails{
            id
            label
            type
            value
            options{
              text
              value
            }
          }
          rfqSteps{
            id
           title
           description
          }
        }
      }`)
    })
    .then(({data}) => data);