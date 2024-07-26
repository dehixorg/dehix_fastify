export interface PutHireDehixTalentPathParams {
    hireDehixTalent_id: string;
}

export interface PutHireDehixTalentBody {
    _id: string;
    business_id: string;
    domainId: string;
    domainName: string;
    skillId: string;
    skillName: string;
    description: string;
    experience: string;
    freelancerRequired: string;
    status: "added" | "approved" | "closed" | "completed";
    visible: "on" | "off";
    freelancerApplied: any[];
    freelancerSelected: any[];
}