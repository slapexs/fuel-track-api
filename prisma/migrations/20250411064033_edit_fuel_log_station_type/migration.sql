/*
  Warnings:

  - You are about to drop the column `stationName` on the `FuelLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FuelLog" DROP COLUMN "stationName",
ADD COLUMN     "station" INTEGER;
