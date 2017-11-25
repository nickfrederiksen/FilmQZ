using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace FilmQZ.App.BusinessLogic.Interfaces
{
    public interface ICrudController<TUpdateModel, TCreateModel>
    {
        Task<IHttpActionResult> GetAll(CancellationToken cancellationToken);
        Task<IHttpActionResult> GetSingle(Guid id, CancellationToken cancellationToken);
        Task<IHttpActionResult> Update(Guid id, TUpdateModel model, CancellationToken cancellationToken);
        Task<IHttpActionResult> Create(TCreateModel createModel, CancellationToken cancellationToken);
        Task<IHttpActionResult> Delete(Guid id, CancellationToken cancellationToken);
    }

    public interface IGameIdCrudController<TUpdateModel, TCreateModel>
    {
        Task<IHttpActionResult> GetAll(Guid gameId, CancellationToken cancellationToken);
        Task<IHttpActionResult> GetSingle(Guid gameId, Guid id, CancellationToken cancellationToken);
        Task<IHttpActionResult> Update(Guid gameId, Guid id, TUpdateModel model, CancellationToken cancellationToken);
        Task<IHttpActionResult> Create(Guid gameId, TCreateModel createModel, CancellationToken cancellationToken);
        Task<IHttpActionResult> Delete(Guid gameId, Guid id, CancellationToken cancellationToken);
    }

    public interface IRoundIdCrudController<TUpdateModel, TCreateModel>
    {
        Task<IHttpActionResult> GetAll(Guid gameId, Guid roundId, CancellationToken cancellationToken);
        Task<IHttpActionResult> GetSingle(Guid gameId, Guid roundId, Guid id, CancellationToken cancellationToken);
        Task<IHttpActionResult> Update(Guid gameId, Guid roundId, Guid id, TUpdateModel model, CancellationToken cancellationToken);
        Task<IHttpActionResult> Create(Guid gameId, Guid roundId, TCreateModel createModel, CancellationToken cancellationToken);
        Task<IHttpActionResult> Delete(Guid gameId, Guid roundId, Guid id, CancellationToken cancellationToken);
    }
}
