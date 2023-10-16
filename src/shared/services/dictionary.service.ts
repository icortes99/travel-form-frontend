import { MuscleGroup } from './../generated/graph-schema'
import { Gender, Language } from '../generated'

import { GenderDictionary, LanguageDictionary, MuscleGroupDictionary, ErrorTypeDictionary, ErrorType } from '../types'

class DictionaryService {

  parseLanguageToDictionaryField(language: Language): keyof LanguageDictionary {
    return ({
      [Language.English]: 'en',
      [Language.Spanish]: 'es',
    })[language] as keyof LanguageDictionary
  }

  parseGenderToDictionaryField(gender: Gender): keyof GenderDictionary {
    return ({
      [Gender.Male]: 'male',
      [Gender.Female]: 'female',
      [Gender.NotSpecified]: 'notSpecified'
    })[gender] as keyof GenderDictionary
  }

  parseErrorTypeToDictionaryField(errorType: ErrorType): keyof ErrorTypeDictionary {
    return ({
      [ErrorType.INVALID_CREDENTIALS]: 'notAuthorizedException',
      [ErrorType.VERSION_MISMATCH]: 'versionMismatchException',
      [ErrorType.USER_ALREADY_EXISTS]: 'usernameExistsException',
      [ErrorType.EMAIL_ALREADY_EXISTS]: 'emailExistsException',
      [ErrorType.USER_NOT_CONFIRMED]: 'userNotConfirmedException',
      [ErrorType.LIMIT_EXCEEDED]: 'limitExceededException',
      [ErrorType.EXPIRED_CODE]: 'expiredCodeException',
      [ErrorType.CODE_MISMATCH]: 'codeMismatchException',
      [ErrorType.DEFAULT]: 'defaultError',
    })[errorType] as keyof ErrorTypeDictionary
  }

  parseMuscleGroupToDictionaryField(muscleGroup: MuscleGroup): keyof MuscleGroupDictionary {
    return ({
      [MuscleGroup.Calves]: 'calves',
      [MuscleGroup.Hamstrings]: 'hamstrings',
      [MuscleGroup.Quadriceps]: 'quadriceps',
      [MuscleGroup.Glutes]: 'glutes',
      [MuscleGroup.Biceps]: 'biceps',
      [MuscleGroup.Triceps]: 'triceps',
      [MuscleGroup.Forearms]: 'forearms',
      [MuscleGroup.Trapezius]: 'trapezius',
      [MuscleGroup.Latissimus]: 'latissimus',
      [MuscleGroup.Chest]: 'chest',
      [MuscleGroup.Back]: 'back',
      [MuscleGroup.Arms]: 'arms',
      [MuscleGroup.Abs]: 'abs',
      [MuscleGroup.Legs]: 'legs',
      [MuscleGroup.Shoulders]: 'shoulders',
    })[muscleGroup] as keyof MuscleGroupDictionary
  }

}

const instance = new DictionaryService()

export default instance