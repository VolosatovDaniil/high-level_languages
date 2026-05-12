package com.example.mycourseapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val etRegLogin = findViewById<EditText>(R.id.regLogin)
        val etRegPass = findViewById<EditText>(R.id.regPassword)
        val etRegPassConfirm = findViewById<EditText>(R.id.regPasswordConfirm)
        val btnRegister = findViewById<Button>(R.id.btnRegister)
        val tvGoToLogin = findViewById<TextView>(R.id.goToLogin)

        // логіка реєстрації
        btnRegister.setOnClickListener {
            val login = etRegLogin.text.toString()
            val pass = etRegPass.text.toString()
            val confirm = etRegPassConfirm.text.toString()

            if (login.isEmpty() || pass.isEmpty()) {
                Toast.makeText(this, "Заповніть дані", Toast.LENGTH_SHORT).show()
            } else if (pass != confirm) {
                Toast.makeText(this, "Паролі не збігаються!", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(this, "Акаунт створено!", Toast.LENGTH_SHORT).show()
                finish()
            }
        }
        tvGoToLogin.setOnClickListener {
            finish()
        }
    }
}