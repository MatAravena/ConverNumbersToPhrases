using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace BE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConvertorController : ControllerBase
    {
        private readonly ILogger<ConvertorController> _logger;

        public ConvertorController(ILogger<ConvertorController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "GetConvertidor")]
        public string Post([FromBody] double numberReceived)
        {
            var convertor = new Util.Convertor();  
            return convertor.NumberToPhrase(numberReceived);
        }
    }
}
