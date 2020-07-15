import axios from "axios";
import settings from "../settings"

class Service {
    async getJobs() {
        return await axios.get(`${settings.API_BASE}jobs`)
    }
    async getJobsId(job_id) {
        return await axios.get(`${settings.API_BASE}jobs/${job_id}/related_skills`)
    } 
    async getSkills() {
        return await axios.get(`${settings.API_BASE}skills`)
    }
    async getSkillsNormalize(skill_name) {
        return await axios.get( `${settings.API_BASE}skills/normalize?skill_name=${skill_name}` )
    } 
    async getUnusualTitles() {
        return await axios.get( `${settings.API_BASE}jobs/unusual_titles` )
    } 
    async getAutocomplite(contains) {
        return await axios.get( `${settings.API_BASE}jobs/autocomplete?contains=${contains}` )
    } 
}

export default Service;

