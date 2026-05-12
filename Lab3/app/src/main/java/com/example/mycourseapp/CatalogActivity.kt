package com.example.mycourseapp

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.button.MaterialButton

class CatalogActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_catalog)

        val btnMyCourses = findViewById<MaterialButton>(R.id.btnGoToMyCourses)
        val btnBuy1 = findViewById<MaterialButton>(R.id.btnBuyCourse1)
        val btnBuy2 = findViewById<MaterialButton>(R.id.btnBuyCourse2)
        val btnBuy3 = findViewById<MaterialButton>(R.id.btnBuyCourse3)

        updateButtonState(btnBuy1, CourseManager.isEnglishBought)
        updateButtonState(btnBuy2, CourseManager.isGermanBought)
        updateButtonState(btnBuy3, CourseManager.isFrenchBought)

        btnMyCourses.setOnClickListener {
            startActivity(Intent(this, MyCoursesActivity::class.java))
        }

        // логіка для англійської
        btnBuy1.setOnClickListener {
            if (CourseManager.isEnglishBought) {
                Toast.makeText(this, "Ви вже записані на цей курс!", Toast.LENGTH_SHORT).show()
            } else {
                CourseManager.isEnglishBought = true
                updateButtonState(btnBuy1, true)
                Toast.makeText(this, "Успішно! Вас записано на Англійську", Toast.LENGTH_SHORT).show()
            }
        }

        // логіка для німецької
        btnBuy2.setOnClickListener {
            if (CourseManager.isGermanBought) {
                Toast.makeText(this, "Ви вже записані на цей курс!", Toast.LENGTH_SHORT).show()
            } else {
                CourseManager.isGermanBought = true
                updateButtonState(btnBuy2, true)
                Toast.makeText(this, "Успішно! Вас записано на Німецьку", Toast.LENGTH_SHORT).show()
            }
        }

        // логіка для французької
        btnBuy3.setOnClickListener {
            if (CourseManager.isFrenchBought) {
                Toast.makeText(this, "Ви вже записані на цей курс!", Toast.LENGTH_SHORT).show()
            } else {
                CourseManager.isFrenchBought = true
                updateButtonState(btnBuy3, true)
                Toast.makeText(this, "Успішно! Вас записано на Французьку", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun updateButtonState(button: MaterialButton, isBought: Boolean) {
        if (isBought) {
            button.text = "Ви вже записані"
            button.setBackgroundColor(Color.GRAY)
            button.isEnabled = true
        } else {
            button.text = "Записатися на курс"
            button.setBackgroundColor(Color.parseColor("#5F27CD"))
        }
    }

    override fun onResume() {
        super.onResume()
        val btnBuy1 = findViewById<MaterialButton>(R.id.btnBuyCourse1)
        val btnBuy2 = findViewById<MaterialButton>(R.id.btnBuyCourse2)
        val btnBuy3 = findViewById<MaterialButton>(R.id.btnBuyCourse3)

        updateButtonState(btnBuy1, CourseManager.isEnglishBought)
        updateButtonState(btnBuy2, CourseManager.isGermanBought)
        updateButtonState(btnBuy3, CourseManager.isFrenchBought)
    }
}