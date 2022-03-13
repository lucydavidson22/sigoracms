export class Document{
    constructor(
        public id:string,
        public name:string,
        // public dateKnocked:string,
        public knocks:number,
        // public url:string,
        public answers:number,
        public sets:number,
        public totalTime: number,
        public propsRun: number,
        public knocksperanswer: number,
        public knocksperhour: number,
        public answersperset:number,
        public setsperhour: number
        ){}
}
