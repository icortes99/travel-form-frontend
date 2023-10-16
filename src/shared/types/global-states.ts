import { RoutineDay, User, Workout, WorkoutExercise } from '../model';

import { TrainingStatus, TrainingActionType } from '../constants';

import { WorkoutUpdateValues } from '../context/training/training.context';

import { Day, GetTrainingQuery, Language } from '../generated';

export type LanguageState = Language;
export type UserState = User | undefined;
export type TrainingState = {
  day: Day,
  status: TrainingStatus,
  workouts: Workout[];
  workout: Workout | null;
  routineDay: RoutineDay | null;
  workoutExercise: WorkoutExercise | null;
  isNextWorkoutAvailable: boolean;
  isPreviousWorkoutAvailable: boolean;
  completedWorkoutAmount: number;
};

export type Action<T = TrainingActionType, P = null> = {
  type: T,
  payload: P
};

type WorkoutViewAction = Action<TrainingActionType.WORKOUT_VIEW,
  { uuid: string | null }
>;

type ExerciseViewAction = Action<TrainingActionType.EXERCISE_VIEW,
  {
    uuid: string | null
  }
>;

type SetRoutineDayAction = Action<TrainingActionType.SET_ROUTINE_DAY,
  { day: Day, data: GetTrainingQuery; routine: { uuid: string } }
>;

type UpdateWorkoutAction = Action<TrainingActionType.UPDATE_WORKOUT,
  { workout: Workout, data: WorkoutUpdateValues }
>;

type NoPayloadAction = Action<
  | TrainingActionType.START
  | TrainingActionType.RESET
  | TrainingActionType.FINISH
  | TrainingActionType.NEXT_WORKOUT
  | TrainingActionType.PREVIOUS_WORKOUT
>;

export type TrainingAction =
  | UpdateWorkoutAction
  | WorkoutViewAction
  | ExerciseViewAction
  | SetRoutineDayAction
  | NoPayloadAction;