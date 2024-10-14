import { AbilityBuilder, Ability } from '@casl/ability';
import settings from '../config/settings';
import { Can } from './Can';

export const updateAbility = (ability, keycloak) => {
    const { can, rules } = new AbilityBuilder(Ability);
    
    // if(keycloak && keycloak.resourceAccess && keycloak.resourceAccess[settings.client_keycloak] && keycloak.resourceAccess[settings.client_keycloak].roles){
    //     if(keycloak.resourceAccess[settings.client_keycloak].roles.indexOf("ADMIN") >= 0){
    //         can('manage', 'all');
    //     }
    //     if(keycloak.resourceAccess[settings.client_keycloak].roles.indexOf("ReadDemande") >= 0){
    //         can('create', 'ChangeRequest');
    //         can('edit', 'ChangeRequest');
    //         can('delete', 'ChangeRequest');
    //         can('read', 'ChangeRequest');
    //         // can('valid', 'ChangeRequest');
    //     }
    //     if(keycloak.resourceAccess[settings.client_keycloak].roles.indexOf("OCM_EMPLOYEE") >= 0){
    //         can('create', 'Request');
    //         can('delete', 'Draft_Request');
    //         can('create', 'Request_Extension');
    //         can('read', 'Request_Extension');
    //         can('read', 'Request');
    //     }
    // }
    can('manage', 'all');
    ability.update(rules);
}