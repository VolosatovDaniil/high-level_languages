package com.example.mycourseapp

object CourseManager {
    // статуси купівлі
    var isEnglishBought = false
    var isGermanBought = false
    var isFrenchBought = false

    // статуси проходження
    var statusEnglish = "В процесі"
    var statusGerman = "В процесі"
    var statusFrench = "В процесі"

    // списки оцінок
    private val ratingsEng = mutableListOf(5.0f, 4.0f)
    private val ratingsGer = mutableListOf(4.0f)
    private val ratingsFre = mutableListOf(5.0f)

    // додавання рейтингу
    fun addRatingEng(rating: Float) { ratingsEng.add(rating) }
    fun addRatingGer(rating: Float) { ratingsGer.add(rating) }
    fun addRatingFre(rating: Float) { ratingsFre.add(rating) }

    // розрахунок середнього
    fun getAvgEng(): Float = if (ratingsEng.isEmpty()) 0f else ratingsEng.average().toFloat()
    fun getAvgGer(): Float = if (ratingsGer.isEmpty()) 0f else ratingsGer.average().toFloat()
    fun getAvgFre(): Float = if (ratingsFre.isEmpty()) 0f else ratingsFre.average().toFloat()
}