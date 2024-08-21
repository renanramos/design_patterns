import crypto from "crypto";

/**
 * Exemplo de implementação sem o uso do padrão Prototype
 */


export class Field {
    constructor (readonly fieldId: string, readonly type: string, readonly title: string) {

    }

    static create (type: string, title: string) {
        const fieldId = crypto.randomUUID();
        return new Field(fieldId, type, title);
    }
}

export class Form {   
    fields: Field[];

    constructor (readonly formId: string, readonly category: string, readonly description: string) {
        this.fields = [];
    }

    addField (type: string, title: string) {
        this.fields.push(Field.create(type, title));
    }
}

export interface FormRepository {
    getById(formId: string): Promise<Form>;
    save (form: Form): Promise<void>;
}

export class CopyForm {

    constructor (readonly formRepository: FormRepository) {

    }

    async execute(input: Input) {
        const form = await this.formRepository.getById(input.fromFormId);
        const newForm = new Form(input.newFormId, input.newCategory, input.newDescription);
        const fields: Field[] = [];
        for (const field of form.fields) {
            fields.push(new Field(field.fieldId, field.type, field.title));
        }
        newForm.fields = fields;

        await this.formRepository.save(newForm);
    }
}

type Input = {
    fromFormId: string,
    newFormId: string,
    newCategory: string,
    newDescription: string
}