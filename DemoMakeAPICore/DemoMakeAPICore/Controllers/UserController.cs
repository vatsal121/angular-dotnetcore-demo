using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DemoMakeAPICore.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DemoMakeAPICore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UserController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly DotNetCoreContext _context;

        public UserController(IConfiguration config, DotNetCoreContext context)
        {
            _configuration = config;
            _context = context;
        }

        [Route("token")]
        [HttpPost]
        public async Task<ObjectResult> Post(UserInfo _userData)
        {
            try
            {
                if (_userData != null && _userData.Email != null && _userData.Password != null)
                {
                    var user = await GetUser(_userData.Email, _userData.Password);

                    if (user != null)
                    {
                        //create claims details based on the user information
                        var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Id", user.UserId.ToString()),
                    new Claim("FirstName", user.FirstName),
                    new Claim("LastName", user.LastName),
                    new Claim("UserName", user.UserName),
                    new Claim("Email", user.Email)
                   };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

                        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);

                        return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                    }
                    else
                    {
                        return Ok("Invalid");
                    }
                }
                else
                {
                    return BadRequest(StatusCodes.Status400BadRequest);
                    
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }

        [Route("PostUser")]
        [HttpPost]
        public async Task<ActionResult<UserInfo>> PostUser(UserInfo _user)
        {
            try
            {
                _context.UserInfo.Add(_user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUsers", new { id = _user.UserId }, _user);
            }
            catch (Exception)
            {
                return Ok("Invalid");
            }
        }
        private async Task<UserInfo> GetUser(string email, string password)
        {
            return await _context.UserInfo.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserInfo>> GetUsers(int id)
        {
            var Users = await _context.UserInfo.FindAsync(id);

            if (Users == null)
            {
                return NotFound();
            }

            return Users;
        }
    }
}