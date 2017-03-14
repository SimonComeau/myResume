using System;
using System.Collections.Generic;
using System.Configuration;
using System.Security.Cryptography;
using System.Text;
using myResumeAPI.Models;

namespace myResumeAPI.Services {
	public class AuthenticationService {
		static AuthenticationService _instance;

		AuthenticationService() {}

		public static AuthenticationService Instance => _instance ?? (_instance = new AuthenticationService());
		Dictionary<int, Session> SessionLookUp { get; } = new Dictionary<int, Session>();

		public string GetAuthToken(int sessionId)
			=> ValidateSession(sessionId) ? SessionLookUp[sessionId].AuthToken.ToString() : CreateNewSession(sessionId).AuthToken.ToString();

		Session CreateNewSession(int sessionId) {
			var guid = Guid.NewGuid();
			var newSession = new Session {IsLoggedIn = false, AuthToken = guid, Id = sessionId};
			SessionLookUp.Add(sessionId, newSession);
			return newSession;
		}

		bool ValidateSession(int sessionId) => SessionLookUp.ContainsKey(sessionId);

		public bool CheckSessionIsLoggedIn(int sessionId) => ValidateSession(sessionId) && SessionLookUp[sessionId].IsLoggedIn;

		public dynamic ValidateLoginCredentials(dynamic user, int sessionId) {
			var credentials = CreateLoginCredentialsFromUser(user, sessionId);
			var expectedUsername = GetExpectedHash("AdminUsername", credentials.SessionId);
			var expectedPassword = GetExpectedHash("AdminPassword", credentials.SessionId);
			return credentials.Username == expectedUsername && credentials.Password == expectedPassword;
		}

		string GetExpectedHash(string appSettingsKey, int sessionId) {
			var hasher = SHA512.Create();
			var appSetting = ConfigurationManager.AppSettings.Get(appSettingsKey);
			var salt = Encoding.UTF8.GetBytes(appSetting + GetAuthToken(sessionId));
			return ConvertToHexHash(hasher.ComputeHash(salt));
		}

		static string ConvertToHexHash(byte[] hash) => BitConverter.ToString(hash).Replace("-", "").ToLower();

		public void LogoutSession(int sessionId) {
			if (ValidateSession(sessionId)) {
				SessionLookUp.Remove(sessionId);
			}
		}

		public void LoginSession(int sessionId) {
			if (ValidateSession(sessionId)) {
				SessionLookUp[sessionId].IsLoggedIn = true;
			}
		}

		LoginCredentials CreateLoginCredentialsFromUser(dynamic user, int sessionId)
			=> new LoginCredentials {Username = user.username.ToString(), Password = user.password.ToString(), SessionId = sessionId};
	}
}