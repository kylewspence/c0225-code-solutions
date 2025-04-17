# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- RentCast API integration for property data
  - Added RentCastService class with caching and rate limiting
  - Implemented property details and rent estimate endpoints
  - Added debug logging for API calls
  - Added address formatting utility

### Changed
- Updated AIInsightPreview component type from "transactions" to "spending"
- Enhanced responsiveness across components:
  - Dashboard.tsx: Improved mobile layout and tab structure
  - InvestmentsDesktop.tsx: Better grid breakpoints and cleaner layout
  - SpendingDesktop.tsx: Enhanced grid responsiveness
- Consolidated financial widgets into FinancialInsights component
- Added formatCurrency utility function
- Simplified property handling to focus on single property
- Updated property value estimation to use correct API field

### Fixed
- Corrected type prop in TransactionsDesktop component
- Fixed address formatting for RentCast API calls
- Improved error handling in API service
- Enhanced type safety in PropertyDetails component

### Technical Improvements
- Implemented caching system for API calls
- Added rate limiting for API usage
- Enhanced error logging and debugging capabilities
- Improved type definitions across components

### Removed
- Redundant AIInsightPreview components from individual tabs
- Unnecessary commented-out code
- Duplicate financial metrics displays

## [Initial Release]

### Added
- Basic dashboard layout with tabbed interface
- File upload functionality
- Spending analysis features
- Investment portfolio view
- Transaction management
- Data visualization components 