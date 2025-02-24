
import { gql } from '@apollo/client';

export const GET_ALL_PINS = gql`
  query GetAllPins {
    pins {
      id
      title
      description
      type
      imageUrl
      user {
        id
        name
        avatar
      }
    }
  }
`;

export const GET_PINS_BY_TYPE = gql`
  query GetPinsByType($type: String!) {
    pinsByType(type: $type) {
      id
      title
      description
      type
      imageUrl
      user {
        id
        name
        avatar
      }
    }
  }
`;
