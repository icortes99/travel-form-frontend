import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Application = {
  applicationAttractions?: Maybe<Array<ApplicationAttraction>>;
  contactPreference?: Maybe<ContactPreference>;
  createdAt?: Maybe<Scalars['DateTime']>;
  destination?: Maybe<Destination>;
  destinationId?: Maybe<Scalars['Int']>;
  endDate?: Maybe<Scalars['DateTime']>;
  hasEntryPermission?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  leadSource?: Maybe<LeadSource>;
  passengers?: Maybe<Array<Passengers>>;
  startDate?: Maybe<Scalars['DateTime']>;
  travelAgency?: Maybe<TravelAgency>;
  travelAgencyId?: Maybe<Scalars['Int']>;
  tripObjective?: Maybe<TripObjective>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  userCurrentLocation?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type ApplicationAttraction = {
  application: Application;
  applicationId: Scalars['Float'];
  attraction: Attraction;
  attractionId: Scalars['Float'];
};

export type ApplicationAttractionCreateNestedManyWithoutApplicationInput = {
  create: Array<ApplicationAttractionCreateWithoutApplicationInput>;
};

export type ApplicationAttractionCreateWithoutApplicationInput = {
  attraction: AttractionCreateNestedOneWithoutApplicationAttractionsInput;
};

export type ApplicationCreateInput = {
  applicationAttractions: ApplicationAttractionCreateNestedManyWithoutApplicationInput;
  contactPreference: ContactPreference;
  destination: DestinationCreateNestedOneWithoutApplicationsInput;
  endDate: Scalars['DateTime'];
  hasEntryPermission: Scalars['Boolean'];
  leadSource: LeadSource;
  passengers?: InputMaybe<PassengersCreateNestedManyWithoutApplicationInput>;
  startDate: Scalars['DateTime'];
  travelAgency: TravelAgencyCreateNestedOneWithoutApplicationsInput;
  tripObjective: TripObjective;
  user?: InputMaybe<UserCreateNestedOneWithoutApplicationsInput>;
  userCurrentLocation: Scalars['String'];
};

export type ApplicationWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type Attraction = {
  applicationAttractions?: Maybe<Array<ApplicationAttraction>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  destination?: Maybe<Destination>;
  destinationId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Float']>;
  images?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  travelDistance?: Maybe<Scalars['Float']>;
  travelDuration?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['String']>;
};

export type AttractionCreateInput = {
  description: Scalars['String'];
  destination: DestinationCreateNestedOneWithoutAttractionsInput;
  images: Array<Scalars['String']>;
  name: Scalars['String'];
  travelDistance: Scalars['Float'];
  travelDuration: Scalars['Float'];
};

export type AttractionCreateNestedOneWithoutApplicationAttractionsInput = {
  connect: AttractionWhereUniqueInput;
};

export type AttractionWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export enum ContactPreference {
  Call = 'CALL',
  Email = 'EMAIL',
  Other = 'OTHER',
  Sms = 'SMS',
  VideoCall = 'VIDEO_CALL',
  Whatsapp = 'WHATSAPP'
}

export type Destination = {
  applications?: Maybe<Array<Application>>;
  attractions?: Maybe<Array<Attraction>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  hotelDestinations?: Maybe<Array<HotelDestination>>;
  id?: Maybe<Scalars['Float']>;
  images?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
};

export type DestinationCreateInput = {
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  name: Scalars['String'];
  video: Scalars['String'];
};

export type DestinationCreateNestedOneWithoutApplicationsInput = {
  connect: DestinationWhereUniqueInput;
};

export type DestinationCreateNestedOneWithoutAttractionsInput = {
  connect: DestinationWhereUniqueInput;
};

export type DestinationWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type Hotel = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  hotelDestinations?: Maybe<Array<HotelDestination>>;
  id?: Maybe<Scalars['Int']>;
  images?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  suites?: Maybe<Array<Suite>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['String']>;
};

export type HotelCreateInput = {
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type HotelCreateNestedOneWithoutSuitesInput = {
  connect: HotelWhereUniqueInput;
};

export type HotelDesinationWhereUniqueInput = {
  destinationId: Scalars['Int'];
  hotelId: Scalars['Int'];
  travelAgencyId: Scalars['Int'];
};

export type HotelDestination = {
  destination?: Maybe<Destination>;
  destinationId?: Maybe<Scalars['Int']>;
  hotel?: Maybe<Hotel>;
  hotelId?: Maybe<Scalars['Int']>;
  travelAgency?: Maybe<TravelAgency>;
  travelAgencyId?: Maybe<Scalars['Int']>;
};

export type HotelDestinationCreateInput = {
  destination: HotelDestinationCreateNestedManyWithoutDestinationInput;
  hotel: HotelDestinationCreateNestedManyWithoutHotelInput;
  travelAgency: TravelAgencyCreateNestedOneWithoutDestinationsInput;
};

export type HotelDestinationCreateNestedManyWithoutDestinationInput = {
  connect: DestinationWhereUniqueInput;
};

export type HotelDestinationCreateNestedManyWithoutHotelInput = {
  connect: HotelWhereUniqueInput;
};

export type HotelWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type HotelsInDesinationAgencyWhereUniqueInput = {
  destination: DestinationWhereUniqueInput;
  travelAgency: TravelAgencyWhereUniqueInput;
};

export enum LeadSource {
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  Other = 'OTHER',
  Referral = 'REFERRAL',
  Website = 'WEBSITE'
}

export type Mutation = {
  createApplication: Application;
  createAttraction: Attraction;
  createDestination: Destination;
  createHotel: Hotel;
  createHotelDestination: HotelDestination;
  createSuite: Suite;
  createTravelAgency: TravelAgency;
  createUser: User;
};


export type MutationCreateApplicationArgs = {
  data: ApplicationCreateInput;
};


export type MutationCreateAttractionArgs = {
  data: AttractionCreateInput;
};


export type MutationCreateDestinationArgs = {
  data: DestinationCreateInput;
};


export type MutationCreateHotelArgs = {
  data: HotelCreateInput;
};


export type MutationCreateHotelDestinationArgs = {
  data: HotelDestinationCreateInput;
};


export type MutationCreateSuiteArgs = {
  data: SuiteCreateInput;
};


export type MutationCreateTravelAgencyArgs = {
  data: TravelAgencyCreateInput;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type Passengers = {
  application: Application;
  applicationId: Scalars['Float'];
  person: Person;
  personId: Scalars['Float'];
  suite: Suite;
  suiteId: Scalars['Float'];
};

export type PassengersCreateNestedManyWithoutApplicationInput = {
  create: Array<PassengersCreateWithoutApplicationInput>;
};

export type PassengersCreateWithoutApplicationInput = {
  person: PersonCreateNestedOneWithoutPassengersInput;
  suite: SuiteCreateNestedOneWithoutPassengersInput;
};

export type Person = {
  birthdate?: Maybe<Scalars['DateTime']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
  passengers?: Maybe<Array<Passengers>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['String']>;
};

export type PersonCreateNestedOneWithoutPassengersInput = {
  create: PersonCreateWithoutPassengersInput;
};

export type PersonCreateNestedOneWithoutUserInput = {
  create: PersonCreateWithoutUserInput;
};

export type PersonCreateWithoutPassengersInput = {
  birthdate: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type PersonCreateWithoutUserInput = {
  birthdate: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type Query = {
  application?: Maybe<Application>;
  attraction?: Maybe<Attraction>;
  destination?: Maybe<Destination>;
  hotel?: Maybe<Hotel>;
  hotelDestination?: Maybe<HotelDestination>;
  hotelsInDestinationAgency?: Maybe<Array<HotelDestination>>;
  suite?: Maybe<Suite>;
  travelAgency?: Maybe<TravelAgency>;
  user?: Maybe<User>;
};


export type QueryApplicationArgs = {
  where: ApplicationWhereUniqueInput;
};


export type QueryAttractionArgs = {
  where: AttractionWhereUniqueInput;
};


export type QueryDestinationArgs = {
  where: DestinationWhereUniqueInput;
};


export type QueryHotelArgs = {
  where: AttractionWhereUniqueInput;
};


export type QueryHotelDestinationArgs = {
  where: HotelDesinationWhereUniqueInput;
};


export type QueryHotelsInDestinationAgencyArgs = {
  where: HotelsInDesinationAgencyWhereUniqueInput;
};


export type QuerySuiteArgs = {
  where: SuiteWhereUniqueInput;
};


export type QueryTravelAgencyArgs = {
  where: TravelAgencyWhereUniqueInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type Suite = {
  basedPrice?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  feePerAdult?: Maybe<Scalars['Float']>;
  feePerKid?: Maybe<Scalars['Float']>;
  hotel?: Maybe<Hotel>;
  hotelId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  images?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  passengers?: Maybe<Array<Passengers>>;
  uuid?: Maybe<Scalars['String']>;
};

export type SuiteCreateInput = {
  basedPrice: Scalars['Float'];
  description: Scalars['String'];
  feePerAdult: Scalars['Float'];
  feePerKid: Scalars['Float'];
  hotel: HotelCreateNestedOneWithoutSuitesInput;
  images: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type SuiteCreateNestedOneWithoutPassengersInput = {
  connect: SuiteWhereUniqueInput;
};

export type SuiteWhereUniqueInput = {
  id?: InputMaybe<Scalars['Float']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type TravelAgency = {
  applications?: Maybe<Array<Application>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  hotelDestinations?: Maybe<Array<HotelDestination>>;
  id?: Maybe<Scalars['Float']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type TravelAgencyCreateInput = {
  logo: Scalars['String'];
  name: Scalars['String'];
  owner: UserCreateNestedOneWithoutTravelAgencyInput;
  slug: Scalars['String'];
  website: Scalars['String'];
};

export type TravelAgencyCreateNestedOneWithoutApplicationsInput = {
  connect: TravelAgencyWhereUniqueInput;
};

export type TravelAgencyCreateNestedOneWithoutDestinationsInput = {
  connect: TravelAgencyWhereUniqueInput;
};

export type TravelAgencyWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  slug?: InputMaybe<Scalars['String']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export enum TripObjective {
  Adventure = 'ADVENTURE',
  BeachAndSun = 'BEACH_AND_SUN',
  Couple = 'COUPLE',
  CulturalExploration = 'CULTURAL_EXPLORATION',
  Family = 'FAMILY',
  FoodAndCulinary = 'FOOD_AND_CULINARY',
  Friends = 'FRIENDS',
  Honeymoon = 'HONEYMOON',
  Other = 'OTHER',
  Relaxation = 'RELAXATION',
  Solo = 'SOLO',
  SportsAndRecreation = 'SPORTS_AND_RECREATION',
  Vacation = 'VACATION',
  WildlifeAndNature = 'WILDLIFE_AND_NATURE'
}

export type User = {
  applications?: Maybe<Array<Application>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  person?: Maybe<Person>;
  personId?: Maybe<Scalars['Int']>;
  phoneNumber?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  travelAgencies?: Maybe<Array<TravelAgency>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  uuid?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  person: PersonCreateNestedOneWithoutUserInput;
  phoneNumber: Scalars['String'];
  photo: Scalars['String'];
};

export type UserCreateNestedOneWithoutApplicationsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserCreateNestedOneWithoutTravelAgencyInput = {
  connect: UserWhereUniqueInput;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  uuid?: InputMaybe<Scalars['String']>;
};

export type AgencyDestiniesQueryVariables = Exact<{
  where: TravelAgencyWhereUniqueInput;
}>;


export type AgencyDestiniesQuery = { travelAgency?: { applications?: Array<{ uuid?: string | null, destination?: { uuid?: string | null, name?: string | null, images?: Array<string> | null, description?: string | null } | null }> | null } | null };

export type AttractionsQueryVariables = Exact<{
  where: DestinationWhereUniqueInput;
}>;


export type AttractionsQuery = { destination?: { attractions?: Array<{ uuid?: string | null, name?: string | null, images?: Array<string> | null, description?: string | null }> | null } | null };

export type CreateApplicationMutationVariables = Exact<{
  data: ApplicationCreateInput;
}>;


export type CreateApplicationMutation = { createApplication: { id?: number | null } };

export type HotelsInDestinyQueryVariables = Exact<{
  where: HotelsInDesinationAgencyWhereUniqueInput;
}>;


export type HotelsInDestinyQuery = { hotelsInDestinationAgency?: Array<{ hotel?: { name?: string | null, images?: Array<string> | null, uuid?: string | null, suites?: Array<{ name?: string | null, uuid?: string | null }> | null } | null }> | null };

export type UserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type UserQuery = { user?: { id?: number | null, uuid?: string | null, email?: string | null, createdAt?: any | null, updatedAt?: any | null, person?: { firstName?: string | null, lastName?: string | null, birthdate?: any | null } | null } | null };


export const AgencyDestiniesDocument = gql`
    query agencyDestinies($where: TravelAgencyWhereUniqueInput!) {
  travelAgency(where: $where) {
    applications {
      uuid
      destination {
        uuid
        name
        images
        description
      }
    }
  }
}
    `;

/**
 * __useAgencyDestiniesQuery__
 *
 * To run a query within a React component, call `useAgencyDestiniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAgencyDestiniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAgencyDestiniesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAgencyDestiniesQuery(baseOptions: Apollo.QueryHookOptions<AgencyDestiniesQuery, AgencyDestiniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AgencyDestiniesQuery, AgencyDestiniesQueryVariables>(AgencyDestiniesDocument, options);
      }
export function useAgencyDestiniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AgencyDestiniesQuery, AgencyDestiniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AgencyDestiniesQuery, AgencyDestiniesQueryVariables>(AgencyDestiniesDocument, options);
        }
export type AgencyDestiniesQueryHookResult = ReturnType<typeof useAgencyDestiniesQuery>;
export type AgencyDestiniesLazyQueryHookResult = ReturnType<typeof useAgencyDestiniesLazyQuery>;
export type AgencyDestiniesQueryResult = Apollo.QueryResult<AgencyDestiniesQuery, AgencyDestiniesQueryVariables>;
export const AttractionsDocument = gql`
    query attractions($where: DestinationWhereUniqueInput!) {
  destination(where: $where) {
    attractions {
      uuid
      name
      images
      description
    }
  }
}
    `;

/**
 * __useAttractionsQuery__
 *
 * To run a query within a React component, call `useAttractionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttractionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttractionsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAttractionsQuery(baseOptions: Apollo.QueryHookOptions<AttractionsQuery, AttractionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttractionsQuery, AttractionsQueryVariables>(AttractionsDocument, options);
      }
export function useAttractionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttractionsQuery, AttractionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttractionsQuery, AttractionsQueryVariables>(AttractionsDocument, options);
        }
export type AttractionsQueryHookResult = ReturnType<typeof useAttractionsQuery>;
export type AttractionsLazyQueryHookResult = ReturnType<typeof useAttractionsLazyQuery>;
export type AttractionsQueryResult = Apollo.QueryResult<AttractionsQuery, AttractionsQueryVariables>;
export const CreateApplicationDocument = gql`
    mutation createApplication($data: ApplicationCreateInput!) {
  createApplication(data: $data) {
    id
  }
}
    `;
export type CreateApplicationMutationFn = Apollo.MutationFunction<CreateApplicationMutation, CreateApplicationMutationVariables>;

/**
 * __useCreateApplicationMutation__
 *
 * To run a mutation, you first call `useCreateApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApplicationMutation, { data, loading, error }] = useCreateApplicationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateApplicationMutation(baseOptions?: Apollo.MutationHookOptions<CreateApplicationMutation, CreateApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateApplicationMutation, CreateApplicationMutationVariables>(CreateApplicationDocument, options);
      }
export type CreateApplicationMutationHookResult = ReturnType<typeof useCreateApplicationMutation>;
export type CreateApplicationMutationResult = Apollo.MutationResult<CreateApplicationMutation>;
export type CreateApplicationMutationOptions = Apollo.BaseMutationOptions<CreateApplicationMutation, CreateApplicationMutationVariables>;
export const HotelsInDestinyDocument = gql`
    query hotelsInDestiny($where: HotelsInDesinationAgencyWhereUniqueInput!) {
  hotelsInDestinationAgency(where: $where) {
    hotel {
      name
      images
      uuid
      suites {
        name
        uuid
      }
    }
  }
}
    `;

/**
 * __useHotelsInDestinyQuery__
 *
 * To run a query within a React component, call `useHotelsInDestinyQuery` and pass it any options that fit your needs.
 * When your component renders, `useHotelsInDestinyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHotelsInDestinyQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useHotelsInDestinyQuery(baseOptions: Apollo.QueryHookOptions<HotelsInDestinyQuery, HotelsInDestinyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HotelsInDestinyQuery, HotelsInDestinyQueryVariables>(HotelsInDestinyDocument, options);
      }
export function useHotelsInDestinyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HotelsInDestinyQuery, HotelsInDestinyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HotelsInDestinyQuery, HotelsInDestinyQueryVariables>(HotelsInDestinyDocument, options);
        }
export type HotelsInDestinyQueryHookResult = ReturnType<typeof useHotelsInDestinyQuery>;
export type HotelsInDestinyLazyQueryHookResult = ReturnType<typeof useHotelsInDestinyLazyQuery>;
export type HotelsInDestinyQueryResult = Apollo.QueryResult<HotelsInDestinyQuery, HotelsInDestinyQueryVariables>;
export const UserDocument = gql`
    query user($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    uuid
    email
    createdAt
    updatedAt
    person {
      firstName
      lastName
      birthdate
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;