import { QueryParametersFilterItem, QueryParametersOrder, StofwareClient } from "@stofloos/stofware-client";

const EPD_API_URL = process.env.NEXT_PUBLIC_EPD_API_URL || "http://localhost:5055";

export class EPDService {
    private client: StofwareClient;
    private token: string;

    constructor(token: string) {
        this.client = new StofwareClient(EPD_API_URL, token);
        this.token = token;
    }

    updateToken(token: string) {
        this.client.setToken(token);
    }

    async getTemplates(search?: string) {
        const filters: QueryParametersFilterItem[] | undefined = search && search.trim() !== ''
            ? [{ name: "title", operator: "ilike-unaccent", value: search }]
            : undefined;
        const order_by: QueryParametersOrder = { name: "last_updated_at", direction: "desc" };
        const templates = await this.client._request("GET", "contentblock", filters ? {
            filters,
            order_by
        } : {order_by});
        
        return templates;
    }

    async getTemplateById(templateId: string) {
        const template = await this.client._request("GET", `contentblock/${templateId}`);
        return template;
    }

    async updateTemplate(template) {
        template.last_updated_at = new Date().toISOString();
        const updatedTemplate = await this.client._request("PUT", `contentblock/${template.id}`, null, template);
        return updatedTemplate;
    }

    async createTemplate(template) {
        const createdTemplate = await this.client._request("POST", "contentblock", null, template);
        return createdTemplate;
    }

    async uploadImage(images: FileList) {
        const formData = new FormData();
        Array.from(images).forEach((image) => {
            formData.append("images", image);
        });
        const response = await fetch(`${EPD_API_URL}/images`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.token}`,
                "Private": "false",
                "Base-Path": "email_builder",
            },
            body: formData
        });
        const uploadedImage = await response.json();
        return uploadedImage;
    }
}