function enumize(enumDefinition) {
  const byId = {}
  const list = []
  let key
  let temp

  for (key in enumDefinition) {
    if (enumDefinition.hasOwnProperty(key)) {
      temp = Object.assign({}, enumDefinition[key])
      delete temp.id
      temp[key] = key
      list.push({
        label: enumDefinition[key].label,
        value: enumDefinition[key].id,
        key: enumDefinition[key].value,
      })
      byId[enumDefinition[key].id] = temp
    }
  }
  enumDefinition.ids = byId
  enumDefinition.list = list
  return enumDefinition
}

exports.ROLES = enumize({
  PARTICIPANT: { id: 1, u: 'participant', role: 'PARTICIPANT' },
  LEADER: { id: 2, u: 'leader', role: 'AWARD_LEADER' },
  NAO_STAFF: { id: 3, u: 'naa_oa_staff', role: 'NAA_OA_STAFF' },
  IF_STAFF_SUPER: { id: 4, u: 'if_staff_superuser', roles: 'IF_STAFF_SUPERUSER' },
  IF_STAFF_USER: { id: 4, u: 'if_staff_statistical_user', role: 'IF_STAFF_STATISTICAL_USER' },
  IF_STAFF_VIEWER: { id: 5, u: 'if_staff_viewer', role: 'IF_STAFF_VIEWER' },
  AWARD_VERIFIER: { id: 6, u: 'award_verifier', role: 'AWARD_VERIFIER' },
  COORDINATOR: { id: 7, u: 'coordinator', role: 'COORDINATOR' },
  AJ_ASSESSOR: { id: 7, u: 'aj_assessor', role: 'AJ_ASSESSOR' },
  AJ_SUPERVISOR: { id: 8, u: 'aj_supervisor', role: 'AJ_SUPERVISOR' },
  AJ_INSTRUCTOR: { id: 9, u: 'aj_instructor', role: 'AJ_INSTRUCTOR' },
  ALL: { id: 0, u: 'all' },
})

exports.PAYMENTS = enumize({
  NOT_PAID: { id: 'NOT_PAID' }
})

exports.LEVELS = enumize({
  BRONZE: { id: 1, label: 'Bronze', value: 'BRONZE' },
  SILVER: { id: 2, label: 'Silver', value: 'SILVER' },
  GOLD: { id: 3, label: 'Gold', value: 'GOLD' }
})

exports.AJ_TYPES = enumize({
  EXPLORATION: { id: 3 },
  EXPEDITION: { id: 2 },
  ADVENTUROUS_PROJECT: { id: 1 }
})

exports.AJ_EVENT_TYPES = enumize({
  preparation: { id: 'PREPARATION' },
  practice: { id: 'PRACTICE' },
  qualification: { id: 'QUALIFICATION' },
})

exports.CONFIGURATION_KEYS = enumize({
  manageAllParticipants: { id: 'LEADER_MANAGE_ALL_PARTICIPANTS' },
  confirmationEmailBody: { id: 'PARTICIPANT_REGISTRATION_CONFIRMATION_EMAIL_BODY' },
})

exports.CODE_LISTS = enumize({
  GENDERS: { id: 'CL_GENDERS', label: 'genders' },
  EMPLOYMENT_STATUSES: { id: 'CL_EMPLOYMENT_STATUSES', label: 'employmentStatuses' },
  NATIONALITIES: { id: 'CL_NATIONALITIES', label: 'nationalities' },
  TITLES: { id: 'CL_TITLES', label: 'titles' },
  PHONE_TYPES: { id: 'CL_PHONE_TYPES', label: 'phoneTypes' },
  CONSENT_DELIVERY_TYPES: { id: 'CL_CONSENT_DELIVERY_TYPES', label: 'consentDeliveryTypes' },
  PARTICIPANT_PAYMENT_STATES: { id: 'CL_PARTICIPANT_PAYMENT_STATES', label: 'participantPaymentStates' },
  USER_REGISTRATION_ASSESSMENT_STATES: { id: 'CL_USER_REGISTRATION_ASSESSMENT_STATES', label: 'userRegistrationAssessmentStates' },
  AJ_CATEGORIES_TYPES: { id: 'CL_AJ_EVENT_CATEGORIES', label: 'ajEventCategories' },
  MODE_OF_TRANSPORT_TYPES: { id: 'CL_MODE_OF_TRANSPORT_TYPES', label: 'modeOfTransportTypeList' },
  PROJECT_LOCATION_TYPES: { id: 'CL_PROJECT_LOCATION_TYPES', label: 'projectLocationTypes' },
  ORGANIZATION_TYPES: { id: 'CL_ORGANIZATION_TYPES', label: 'organizationTypes' },
  ORGANIZATION_CONTACT_ROLE_TYPES: { id: 'CL_ORGANIZATION_CONTACT_ROLE_TYPES', label: 'organizationContactRoleTypes' },
  ACTIVITY_SECTIONS: { id: 'CL_ACTIVITY_SECTIONS', label: 'activitySections' },
  PERSON_STATES: { id: 'CL_PERSON_STATES', label: 'personStates' },
})

exports.ACTIVITY_SECTIONS = enumize({
  physical: { id: 'PHYSICAL_RECREATION', index: 0 },
  skills: { id: 'SKILL', index: 1 },
  service: { id: 'SERVICE', index: 2 },
  rp: { id: 'RESIDENTIAL_PROJECT', index: 4 },
  aj: { id: 'ADVENTUROUS_JOURNEY', index: 5 },
})

exports.PROGRESS_STATES = enumize({
  awardSetup: { id: 'SETUP' },
  awardInProgress: { id: 'IN_PROGRESS' },
  awardLeaderSignoff: { id: 'LEADER_SIGNOFF' },
  awardOfficeSignoff: { id: 'OFFICE_SIGNOFF' },
  awardLevelComplete: { id: 'COMPLETE' },
  awardAwardComplete: { id: 'COMPLETE' },
  awardCeremony: { id: 'CEREMONY' },
  awardRegAssessment: { id: 'REG_ASSIGNMENT' },
  awardRegApproval: { id: 'REG_APPROVAL' },
  awardRegNotApproved: { id: 'REG_NOT_APPROVED' },
  awardInactive: { id: 'INACTIVE' },
  ajActive: { id: 'ACTIVE' },
  alApproved: { id: 'APPROVED' },
  participantApproved: { id: 'APPROVED' },
  activitySetup: { id: 'SETUP' },
  activityApproval: { id: 'APPROVAL' },
  activityInProgress: { id: 'IN_PROGRESS' },
  activityAssessment: { id: 'ASSESSMENT' },
  activityLeaderSignoff: { id: 'LEADER_SIGNOFF' },
  activityComplete: { id: 'COMPLETE' },
  activityOfficeSignoff: { id: 'OFFICE_SIGNOFF' },
  activityCeremony: { id: 'CEREMONY' },
  activityInactive: { id: 'INACTIVE' },
  approvementState: { id: 'APPROVED' },
})

exports.AJ_PROGRESS_STATES = enumize({
  ajApproval: { id: 'APPROVAL' },
  ajInProgress: { id: 'IN_PROGRESS' },
  ajAssessorApproval: { id: 'ASSESSMENT' },
  ajLeaderSignoff: { id: 'LEADER_SIGNOFF' },
  ajOfficeSignoff: { id: 'OFFICE_SIGNOFF' },
  ajCeremonySignoff: { id: 'CEREMONY' },
  ajComplete: { id: 'COMPLETE' },
  ajInactive: { id: 'INACTIVE' },
})

exports.RP_PROGRESS_STATES = enumize({
  rpSetup: { id: 'SETUP' },
  rpApproval: { id: 'APPROVAL' },
  rpInProgress: { id: 'IN_PROGRESS' },
  rpAssessorApproval: { id: 'ASSESSMENT' },
  rpLeaderSignoff: { id: 'LEADER_SIGNOFF' },
  rpOfficeSignoff: { id: 'OFFICE_SIGNOFF' },
  rpCeremonySignoff: { id: 'CEREMONY' },
  rpComplete: { id: 'COMPLETE' },
  rpInactive: { id: 'INACTIVE' },
})

exports.AJ_TRAINING_PROGRESS_STATES = enumize({
  ajTrainingInProgress: { id: 'IN_PROGRESS' },
  ajTrainingLeaderSignoff: { id: 'LEADER_SIGNOFF' },
})

exports.ACTIONS = enumize({
  ACT_APPROVAL: { id: 'ACT_APPROVAL' },
  ACT_ASSESSMENT_REQ: { id: 'ACT_ASSESSMENT_REQ' },
  AW_LEADER_ASSESSMENT: { id: 'AW_LEADER_ASSESSMENT' }
})

exports.CONSENT_DELIVERY_TYPES = enumize({
  electronically: { id: 'ELECTRONICALLY' },
  paper: { id: 'PAPER' },
  notRequired: { id: 'NOT_REQUIRED' }
})

exports.PERSON_STATES = enumize({
  active: { id: 'ACTIVE' },
  inactive: { id: 'INACTIVE' },
})

exports.ORGANIZATION_HIERARCHY = enumize({
  IAF: { id: 1 },
  RO: { id: 5 },
  NAO: { id: 2 },
  AU: { id: 3 },
  OA: { id: 6 }
})


