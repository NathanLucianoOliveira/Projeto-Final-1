using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Projeto.Database;
using Projeto.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Projeto.Services
{
    public class UsuarioService(DatabaseContext context)
    {
        public async Task<Usuario?> GetById(Guid id)
        {
            return await context.Usuarios
                 .Include(u => u.Grupos)
                 .Include(u => u.GruposParticipante)
                 .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Usuario?> GetByEmail(string email)
        {
            return await context.Usuarios
                 .Include(u => u.Grupos)
                 .Include(u => u.GruposParticipante)
                 .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<Response<Usuario>> Create(Usuario usuario)
        {
            var usuarioExistente = await GetByEmail(usuario.Email);
            if (usuarioExistente != null)
                return new("E-mail já cadastrado.");

            context.Usuarios.Add(usuario);
            await context.SaveChangesAsync();

            return new(usuario, "Usuário cadastrado com sucesso.");
        }

        public async Task<Response<string>> Login(Usuario usuarioForm)
        {
            var usuario = await GetByEmail(usuarioForm.Email);
            if (usuario == null)
                return new("Usuário não encontrado.");

            if (usuario.Senha != usuario.Senha)
            {
                return new("Senha incorreta.");
            }

            var token = GerarToken(usuario);

            return new(token, "Login efetuado com sucesso.");
        }

        public async Task<Response> TrocarSenha(string antigaSenha, string novaSenha)
        {
            var usuario = await GetByEmail(antigaSenha);
            if (usuario == null)
                return new("Usuário não encontrado.");

            if (usuario.Senha != antigaSenha)
            {
                return new("Senha incorreta.");
            }

            usuario.Senha = novaSenha;
            await context.SaveChangesAsync();

            return new("Senha alterada com sucesso.");
        }

        private string GerarToken(Usuario usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("minha-senha-super-secreta-para-autenticacao");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    [
                        new(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                        new(ClaimTypes.Email, usuario.Email)
                    ]),
                Expires = DateTime.UtcNow.AddYears(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
