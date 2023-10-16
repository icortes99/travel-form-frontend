import { Leaves } from '.'

interface Form {
  submit: string
}
interface ProfileForm extends Form {
  email: string
  firstName: string
  lastName: string
  username: string
  password: string
}

interface RegisterForm extends ProfileForm {
  repeatPassword: string
}

export type Translator = (path: DictionaryLeaves) => string;

export interface Dictionary {
  global: {
    language: {
      en: string
      es: string
    },
    languagePrefix: {
      en: string
      es: string
    },
    time: {
      day: string;
      days: string;
    },
    error: {
      required: string
      tooShort: string
      tooLong: string
      invalidString: string
      invalidNumber: string
      invalidEmail: string
      invalidPassword: string
      invalidConfirmPassword: string
      specialCharacterRequired: string
      numericDigitRequired: string
      lowerCaseRequired: string
      upperCaseRequired: string
      notSpacesAndSpecialCharacters: string
      defaultError: {
        title: string
        message: string
        button: string
      }
      versionMismatchException: {
        title: string
        message: string
        button: string
      }
      emailExistsException: {
        title: string
        message: string
        button: string
      }
      usernameExistsException: {
        title: string
        message: string;
        button: string;
      };
      notAuthorizedException: {
        title: string;
        message: string;
        button: string;
      };
      userNotConfirmedException: {
        title: string;
        message: string;
        button: string;
      };
      limitExceededException: {
        title: string;
        message: string;
        button: string;
      };
      expiredCodeException: {
        title: string;
        message: string;
        button: string;
      };
      codeMismatchException: {
        title: string;
        message: string;
        button: string;
      };
    }
  },
  register: {
    title: string;
    form: RegisterForm;
    agreement: {
      criteria: string;
      termsOfService: string;
      privacyPolicy: string;
      and: string;
    };
    collectData: string;
  };
  forgotPassword: {
    title: string;
    form: {
      email: string;
      submit: string;
      verificationCode: string;
      newPassword: string;
    };
  };
  login: {
    title: string;
    form: {
      submit: string;
      email: string;
      password: string;
    };
    forgotPassword: string;
    verifyAccount: {
      title: string;
      description: string;
      form: {
        verificationCode: string;
        submit: string;
        sendNewCode: string;
      };
    };
  };
  home: {
    title: string;
    feed: {
      viewAll: string;
      programs: string;
      coaches: string;
      articles: string;
    }
  };
  profile: {
    title: string;
    unlock: string;
    invite: string;
    stats: {
      workouts: string;
      plans: string;
      bodyMeasures: string;
    },
    general: {
      title: string;
      labels: {
        username: string;
        fullName: string;
        email: string;
        gender: string;
      }
    }
    account: {
      title: string;
      labels: {
        language: string;
        notifications: string;
        changePassword: string;
        logout: string;
      }
    },
    form: {
      submit: string;
      firstName: string;
      lastName: string;
      password: string;
      newPassword: string;
      repeatPassword: string;
    }
  },
}

export type ErrorTypeDictionary = {
  notAuthorizedException: string;
  versionMismatchException: string;
  usernameExistsException: string;
  emailExistsException: string;
  userNotConfirmedException: string;
  limitExceededException: string;
  expiredCodeException: string;
  codeMismatchException: string;
  defaultError: string;
}

export type DictionaryLeaves = Leaves<Dictionary, 4>;