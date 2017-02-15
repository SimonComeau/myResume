using System;
using System.Diagnostics;
using System.Net;
using System.Web.Http;
using System.Web.Http.Results;

namespace myResumeAPI.Controllers
{
    public class AuthenticationController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Login([FromBody] dynamic user)
        {
            var expectedUsername = "{\r\n  \"0\": 73,\r\n  \"1\": 241,\r\n  \"2\": 242,\r\n  \"3\": 153,\r\n  \"4\": 8,\r\n  \"5\": 86,\r\n  \"6\": 198,\r\n  \"7\": 170,\r\n  \"8\": 75,\r\n  \"9\": 57,\r\n  \"10\": 8,\r\n  \"11\": 135,\r\n  \"12\": 246,\r\n  \"13\": 81,\r\n  \"14\": 112,\r\n  \"15\": 249,\r\n  \"16\": 177,\r\n  \"17\": 204,\r\n  \"18\": 194,\r\n  \"19\": 151,\r\n  \"20\": 126,\r\n  \"21\": 88,\r\n  \"22\": 144,\r\n  \"23\": 117,\r\n  \"24\": 230,\r\n  \"25\": 4,\r\n  \"26\": 71,\r\n  \"27\": 60,\r\n  \"28\": 146,\r\n  \"29\": 206,\r\n  \"30\": 238,\r\n  \"31\": 53,\r\n  \"32\": 250,\r\n  \"33\": 3,\r\n  \"34\": 249,\r\n  \"35\": 7,\r\n  \"36\": 58,\r\n  \"37\": 76,\r\n  \"38\": 224,\r\n  \"39\": 45,\r\n  \"40\": 216,\r\n  \"41\": 63,\r\n  \"42\": 124,\r\n  \"43\": 39,\r\n  \"44\": 183,\r\n  \"45\": 175,\r\n  \"46\": 135,\r\n  \"47\": 43,\r\n  \"48\": 251,\r\n  \"49\": 43,\r\n  \"50\": 212,\r\n  \"51\": 114,\r\n  \"52\": 111,\r\n  \"53\": 101,\r\n  \"54\": 156,\r\n  \"55\": 208,\r\n  \"56\": 229,\r\n  \"57\": 195,\r\n  \"58\": 196,\r\n  \"59\": 183,\r\n  \"60\": 161,\r\n  \"61\": 21,\r\n  \"62\": 171,\r\n  \"63\": 14,\r\n  \"64\": 228,\r\n  \"65\": 207,\r\n  \"66\": 53,\r\n  \"67\": 226,\r\n  \"68\": 83,\r\n  \"69\": 37,\r\n  \"70\": 214,\r\n  \"71\": 82,\r\n  \"72\": 10,\r\n  \"73\": 102,\r\n  \"74\": 7,\r\n  \"75\": 78,\r\n  \"76\": 78,\r\n  \"77\": 141,\r\n  \"78\": 45,\r\n  \"79\": 243,\r\n  \"80\": 236,\r\n  \"81\": 109,\r\n  \"82\": 155,\r\n  \"83\": 212,\r\n  \"84\": 108,\r\n  \"85\": 7,\r\n  \"86\": 71,\r\n  \"87\": 27,\r\n  \"88\": 63,\r\n  \"89\": 154,\r\n  \"90\": 195,\r\n  \"91\": 148,\r\n  \"92\": 104,\r\n  \"93\": 139,\r\n  \"94\": 166,\r\n  \"95\": 67,\r\n  \"96\": 2,\r\n  \"97\": 62,\r\n  \"98\": 98,\r\n  \"99\": 44,\r\n  \"100\": 30,\r\n  \"101\": 155,\r\n  \"102\": 161,\r\n  \"103\": 155,\r\n  \"104\": 16,\r\n  \"105\": 167,\r\n  \"106\": 129,\r\n  \"107\": 52,\r\n  \"108\": 235,\r\n  \"109\": 59,\r\n  \"110\": 225,\r\n  \"111\": 18,\r\n  \"112\": 137,\r\n  \"113\": 57,\r\n  \"114\": 91,\r\n  \"115\": 59,\r\n  \"116\": 107,\r\n  \"117\": 42,\r\n  \"118\": 71,\r\n  \"119\": 16,\r\n  \"120\": 40,\r\n  \"121\": 226,\r\n  \"122\": 9,\r\n  \"123\": 191,\r\n  \"124\": 109,\r\n  \"125\": 11,\r\n  \"126\": 135,\r\n  \"127\": 7\r\n}";
            var expectedPassword = "{\r\n  \"0\": 173,\r\n  \"1\": 158,\r\n  \"2\": 249,\r\n  \"3\": 209,\r\n  \"4\": 148,\r\n  \"5\": 81,\r\n  \"6\": 195,\r\n  \"7\": 139,\r\n  \"8\": 3,\r\n  \"9\": 129,\r\n  \"10\": 158,\r\n  \"11\": 175,\r\n  \"12\": 4,\r\n  \"13\": 112,\r\n  \"14\": 137,\r\n  \"15\": 153,\r\n  \"16\": 68,\r\n  \"17\": 225,\r\n  \"18\": 84,\r\n  \"19\": 204,\r\n  \"20\": 50,\r\n  \"21\": 150,\r\n  \"22\": 7,\r\n  \"23\": 72,\r\n  \"24\": 101,\r\n  \"25\": 75,\r\n  \"26\": 62,\r\n  \"27\": 182,\r\n  \"28\": 147,\r\n  \"29\": 90,\r\n  \"30\": 9,\r\n  \"31\": 135,\r\n  \"32\": 32,\r\n  \"33\": 134,\r\n  \"34\": 111,\r\n  \"35\": 134,\r\n  \"36\": 9,\r\n  \"37\": 244,\r\n  \"38\": 49,\r\n  \"39\": 73,\r\n  \"40\": 237,\r\n  \"41\": 90,\r\n  \"42\": 117,\r\n  \"43\": 223,\r\n  \"44\": 183,\r\n  \"45\": 116,\r\n  \"46\": 154,\r\n  \"47\": 249,\r\n  \"48\": 40,\r\n  \"49\": 172,\r\n  \"50\": 159,\r\n  \"51\": 121,\r\n  \"52\": 16,\r\n  \"53\": 233,\r\n  \"54\": 139,\r\n  \"55\": 23,\r\n  \"56\": 77,\r\n  \"57\": 48,\r\n  \"58\": 24,\r\n  \"59\": 101,\r\n  \"60\": 189,\r\n  \"61\": 184,\r\n  \"62\": 125,\r\n  \"63\": 150,\r\n  \"64\": 184,\r\n  \"65\": 160,\r\n  \"66\": 228,\r\n  \"67\": 160,\r\n  \"68\": 158,\r\n  \"69\": 107,\r\n  \"70\": 94,\r\n  \"71\": 99,\r\n  \"72\": 67,\r\n  \"73\": 170,\r\n  \"74\": 83,\r\n  \"75\": 230,\r\n  \"76\": 229,\r\n  \"77\": 26,\r\n  \"78\": 88,\r\n  \"79\": 71,\r\n  \"80\": 195,\r\n  \"81\": 115,\r\n  \"82\": 123,\r\n  \"83\": 92,\r\n  \"84\": 185,\r\n  \"85\": 220,\r\n  \"86\": 249,\r\n  \"87\": 11,\r\n  \"88\": 198,\r\n  \"89\": 199,\r\n  \"90\": 47,\r\n  \"91\": 216,\r\n  \"92\": 78,\r\n  \"93\": 22,\r\n  \"94\": 114,\r\n  \"95\": 5,\r\n  \"96\": 93,\r\n  \"97\": 252,\r\n  \"98\": 85,\r\n  \"99\": 0,\r\n  \"100\": 68,\r\n  \"101\": 64,\r\n  \"102\": 189,\r\n  \"103\": 255,\r\n  \"104\": 210,\r\n  \"105\": 174,\r\n  \"106\": 145,\r\n  \"107\": 17,\r\n  \"108\": 83,\r\n  \"109\": 202,\r\n  \"110\": 194,\r\n  \"111\": 32,\r\n  \"112\": 103,\r\n  \"113\": 33,\r\n  \"114\": 162,\r\n  \"115\": 180,\r\n  \"116\": 2,\r\n  \"117\": 69,\r\n  \"118\": 241,\r\n  \"119\": 123,\r\n  \"120\": 245,\r\n  \"121\": 145,\r\n  \"122\": 153,\r\n  \"123\": 5,\r\n  \"124\": 64,\r\n  \"125\": 140,\r\n  \"126\": 126,\r\n  \"127\": 75\r\n}";
            if (user.username.ToString() == expectedUsername && user.password.ToString() == expectedPassword)
            {
                AuthenticationService.Instance.IsLoggedIn = true;
                return Ok();
            }
            throw new HttpResponseException(HttpStatusCode.Unauthorized);
        }
        [HttpGet]
        public IHttpActionResult IsLoggedIn()
        {
            return Ok(AuthenticationService.Instance.IsLoggedIn);
        }
        [HttpPost]
        public IHttpActionResult Logoff()
        {
            AuthenticationService.Instance.IsLoggedIn = false;
            return Ok();
        }
        [HttpGet]
        [Route("api/authentication/getauthtoken/{sessionId}")]
        public IHttpActionResult GetAuthToken(int sessionId)
        {
            if (AuthenticationService.Instance.SessionLookUp.ContainsKey(sessionId))
            {
                return Ok(AuthenticationService.Instance.SessionLookUp[sessionId].ToString());
            }
            var guid = Guid.NewGuid();
            AuthenticationService.Instance.SessionLookUp.Add(sessionId, guid);
            return Ok(guid.ToString());
        }
    }
}
