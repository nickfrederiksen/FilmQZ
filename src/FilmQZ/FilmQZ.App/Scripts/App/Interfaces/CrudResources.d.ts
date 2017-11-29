declare namespace ns.Resources {
    export interface ICrudResource<TUpdateModel, TCreateModel> {
        GetAll();
        GetSingle(id: string);
        Update(id: string, model: TUpdateModel);
        Create(model: TCreateModel);
        Delete(id: string);
    }

    export interface IGameIdCrudResource<TUpdateModel, TCreateModel> {
        GetAll(gameId: string);
        GetSingle(gameId: string, id: string);
        Update(gameId: string, id: string, model: TUpdateModel);
        Create(gameId: string, model: TCreateModel);
        Delete(gameId: string, id: string);
    }

    export interface IRoundIdCrudResource<TUpdateModel, TCreateModel> {
        GetAll(gameId: string);
        GetSingle(gameId: string, id: string);
        Update(gameId: string, id: string, model: TUpdateModel);
        Create(gameId: string, model: TCreateModel);
        Delete(gameId: string, id: string);
    }
}