using ROAD_CONSTRUCTION_SERVER.Models;

namespace ROAD_CONSTRUCTION_SERVER.Services
{
    public interface IDataService
    {
        Task<Application?> GetDataAsync();
        Task SaveDataAsync(Application data);
    }
}
