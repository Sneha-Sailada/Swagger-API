# Kovon Candidate Application & Shortlisting API

A production-grade REST API built with Node.js, TypeScript, Express, and Prisma (PostgreSQL).

## 🚀 Features
- **Candidate Management**: Create and list candidates.
- **Job Roles**: Create and list international job roles.
- **Smart Applications**: Automatically computes eligibility score and status (ELIGIBLE/REJECTED) based on PRD business rules.
- **Advanced Sorting**: Lists applications sorted by eligibility status, then score, then experience.
- **Shortlisting**: Allows recruiters to shortlist ELIGIBLE candidates.
- **Pagination**: Support for paginated application lists.
- **Swagger Documentation**: Self-documenting API.
- **Layered Architecture**: Controller-Service-Repository pattern.

## 🛠️ Tech Stack
- **Languages**: TypeScript, ES2020
- **Framework**: Express.js
- **ORM**: Prisma (PostgreSQL)
- **Validation**: Zod
- **API Docs**: Swagger (swagger-jsdoc + swagger-ui-express)
- **Testing**: Jest + ts-jest

## 🏁 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL instance

### 2. Setup
```bash
git clone <repo-url>
cd kovon-api
npm install
```

### 3. Database Configuration
1. Copy `.env.example` to `.env`.
2. Update `DATABASE_URL` with your PostgreSQL credentials.

### 4. Database Setup
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Running the API
```bash
npm run dev
```
- API Path: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`

### 🛠️ Troubleshooting: Node.js/npm Not Found?
If you see an error like `npm : The term 'npm' is not recognized`, it's because the Node path isn't loaded in your current terminal. Run this "fix-it" command in PowerShell:

```powershell
# Run this to refresh your environment for the current session
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User"); & "C:\Users\sneha\AppData\Local\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe\fnm.exe" env --use-on-cd | Out-String | Invoke-Expression
```

After running that, `npm run dev` will work!

## 🧪 Testing
```bash
npm run test:unit
```

## 🏗️ Folder Structure
```
src/
 ├── config/        # Prisma client, Swagger setup
 ├── controllers/   # HTTP handlers (parse req/res)
 ├── middlewares/   # Validation (Zod), Global error handler
 ├── repositories/  # Database access (Prisma)
 ├── routes/        # Route index & module routes
 ├── services/      # Business logic (scoring, sorting)
 ├── utils/         # Pure functions (scoring logic), response helpers
 └── validators/    # Zod schemas
```

## 📄 API Response Format
All responses follow this standard:
```json
{
  "success": true,
  "data": { ... },
  "error": "Error message (if success: false)",
  "meta": { "page": 1, "limit": 10, "total": 100, "totalPages": 10 }
}
```

## 🐳 Docker (Bonus)
```bash
docker-compose up --build
```
