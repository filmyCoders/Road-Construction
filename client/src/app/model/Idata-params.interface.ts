export interface Properties {
    value: any;
    label: string;
}


export interface IPropertiesUpdate{

    projectName:string
    constructionConut:number,
    isConstructionCompleted:boolean,
    lengthoftheroad:number
}

export interface Datas {
    samplingTime: string;
    properties: Properties[];
}

export interface Application {
    id: number;
    name: string;
    datas: Datas[];
}