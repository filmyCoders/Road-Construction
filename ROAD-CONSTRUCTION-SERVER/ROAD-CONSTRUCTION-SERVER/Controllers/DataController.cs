using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ROAD_CONSTRUCTION_SERVER.Models;
using ROAD_CONSTRUCTION_SERVER.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ROAD_CONSTRUCTION_SERVER.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IDataService _dataService;
        private readonly ILogger<DataController> _logger;

        public DataController(IDataService dataService, ILogger<DataController> logger)
        {
            _dataService = dataService;
            _logger = logger;
        }

        [HttpGet("get-records")]
        public async Task<ActionResult<List<Application>>> Get()
        {
            _logger.LogInformation("Fetching all data");
            var data = await _dataService.GetDataAsync();
            return Ok(data);
        }


        [HttpPut("update-records")]
        public async Task<IActionResult> Update( Application data)
        {
            _logger.LogInformation("Updating data");

            try
            {

                await _dataService.SaveDataAsync(data);
                _logger.LogInformation("Data updated successfully");
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving data");
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
