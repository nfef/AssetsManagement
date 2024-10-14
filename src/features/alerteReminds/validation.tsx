import * as yup from "yup";

export const alerteRemindValidationSchema = yup.object({
  remindDate: yup.date().min(new Date(),"Veillez indiquer une date à partir de demain.").required("Veillez indiquer la date de fin de rappel"),
  remindInterval: yup.number().integer().min(0,"Veillez entrer une valeur supérieure ou égale à zéro.").required("Veillez indiquer l'interval de jour de rappel").integer(),
  remindNumber: yup.number().integer().min(0,"Veillez entrer une valeur supérieure ou égale à zéro.").required("Veillez indiquer l'interval de jour de rappel"),
  motif: yup.string().required("Veillez indiquer le motif du rappel")
});


export const ConfirmAlerteRemindValidationSchema = yup.object({

  receptionDate: yup.date().required("Veillez indiquer la date de reception"),
  confirmationDate: yup.date().required("Veillez indiquer la date de confirmation"),
  convincing: yup.boolean(),
});